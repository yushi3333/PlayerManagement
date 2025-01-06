import React from 'react'
import {Paper} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import './Home.css'

const Home = ({images}) => {

  return (
    <div className='carousel-container'>
        <Carousel>
            {
                images?.map((item)=>{
                    return(
                        <Paper key={item.id}>
                            <div className='item-card-container'>
                                <div className="item-card" style={{'--img': `url(${item.src})`}}>

                                </div>

                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>


    </div>
   
  )
}

export default Home