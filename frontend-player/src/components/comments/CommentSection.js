import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { getPlayerComments, getTeamComments, createComment, deleteComment } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import './CommentSection.css';

const CommentSection = ({ playerId, teamName, playerName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchComments();
  }, [playerId, teamName]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      let data;
      if (playerId) {
        data = await getPlayerComments(playerId);
      } else if (teamName) {
        data = await getTeamComments(teamName);
      }
      setComments(data || []);
    } catch (error) {
      console.error('获取评论失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const commentData = {
        content: newComment,
        playerId: playerId,
        teamName: teamName
      };

      await createComment(commentData);
      setNewComment('');
      fetchComments(); // 重新获取评论
    } catch (error) {
      console.error('发表评论失败:', error);
      alert('发表评论失败，请稍后重试');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return;

    try {
      await deleteComment(commentId);
      fetchComments(); // 重新获取评论
    } catch (error) {
      console.error('删除评论失败:', error);
      alert('删除评论失败，请稍后重试');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <Card className="comment-section">
      <Card.Header>
        <FontAwesomeIcon icon={faComment} className="me-2" />
        评论 ({comments.length})
      </Card.Header>
      <Card.Body>
        {/* 发表评论表单 */}
        {user ? (
          <Form onSubmit={handleSubmitComment} className="mb-3">
            <Form.Group>
              <Form.Label>发表评论</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`评论${playerName || teamName}...`}
                maxLength={500}
              />
              <Form.Text className="text-muted">
                {newComment.length}/500 字符
              </Form.Text>
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary" 
              size="sm"
              disabled={!newComment.trim()}
              className="mt-2"
            >
              发表评论
            </Button>
          </Form>
        ) : (
          <div className="text-center p-3">
            <p className="text-muted">
              请 <a href="/login">登录</a> 后发表评论
            </p>
          </div>
        )}

        {/* 评论列表 */}
        {loading ? (
          <div className="text-center p-3">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">加载中...</span>
            </div>
          </div>
        ) : comments.length > 0 ? (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} className="comment-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faUser} className="me-2 text-muted" />
                      <strong>{comment.user?.username || '匿名用户'}</strong>
                      <Badge 
                        bg={comment.user?.role === 'ADMIN' ? 'danger' : 'secondary'} 
                        className="ms-2"
                      >
                        {comment.user?.role || 'USER'}
                      </Badge>
                      <small className="text-muted ms-2">
                        {formatDate(comment.createdAt)}
                      </small>
                    </div>
                    <p className="comment-content mb-0">{comment.content}</p>
                  </div>
                  {user && (user.role === 'ADMIN' || user.username === comment.user?.username) && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="ms-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="text-center p-3">
            <p className="text-muted">暂无评论</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentSection; 