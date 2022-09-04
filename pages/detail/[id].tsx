import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';

interface IProps {
  postDetails: Video
}

const Detail = ({postDetails}: IProps) => {
  const [post, setpost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const router = useRouter();
  const onVideoClick = ()=> {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
    console.log("playing?", playing)
  }
  useEffect(()=>{
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted])

  if(!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={()=>router.back()}>
            <MdOutlineCancel className="text-white text-[35px]"/>
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              loop
              ref = {videoRef}
              onClick={onVideoClick}
              className="h-full cursor-pointer"
            >

            </video>
          </div>
          <div className="absolute top-[45%] left-[50%]">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text:8xl" cursor-pointer/>
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={()=> setIsVideoMuted(false)}>
              <HiVolumeOff
              className="text-white text-2xl lg:text-4xl" />
            </button>
          ): (<button onClick={()=> setIsVideoMuted(true)}>
            <HiVolumeUp
            className="text-white text-2xl lg:text-4xl"/>
          </button>)}
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = async ({params:{ id }} : {params: {id: string}}) => {
  const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)
  return {
    props: {postDetails: data}
  }
}
export default Detail