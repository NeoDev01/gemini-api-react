import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets';
import run from '../../config/gemini';
import { Context } from '../../context/Context';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context)

    // const handleInput = value => {
    //     dispatch({ id: "INPUT_UPDATE", payload: value })
    // }
    // console.log(input);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user icon" />
            </div>

            <div className="main-container">

                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, There.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest nature friendly places to go on an exploration</p>
                                <img src={assets.compass_icon} alt="compass icon" />
                            </div>
                            <div className="card">
                                <p>Briefly explain the this topic: Deep Learning and it's unexplored territories</p>
                                <img src={assets.bulb_icon} alt="bulb icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="message icon" />
                            </div>
                            <div className="card">
                                <p>Write down ReactJS code for a Tic-Tac-Toe game</p>
                                <img src={assets.code_icon} alt="code icon" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="code icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="code icon" />
                            {loading
                                ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here...' />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery icon" />
                            <img src={assets.mic_icon} alt="gallery icon" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="gallery icon" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check it's responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;

