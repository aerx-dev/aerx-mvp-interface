import React from 'react'
import Header from './header'
import HeroSection from './heroSection'
import SectionOne from './sectionOne'
import SectionTwo from './sectionTwo'
import About from './about'
import NewsLetterForm from './newsLetterForm'
import WithDots from "../Hero/WithDots";






type Props = {
}

const Index = (props: Props) => {

// images

  const frame="../Rectangle 3251.png"
  const polygon="../Polygon 4.png"
  const saly='../Saly-1.png'
  const group1='../Group 5394.png'

  const saly1='../Saly-44.png'
  const saly2='../Saly-15.png'
  const frame1='../Frame 5176.svg'
  const frame2='../Vector.png'
  const frame3='../frame 5171.png'

  const group2="../landingPage/Group 5389.png"
  const  group3="../landingPage/Group 5388.png"
  const handWriting="../landingPage/Saly-25.png"

  const saly3="../Saly-35.png "
  const saly4="../Saly-34.png "
  const fly1="../Fly æ 5.png "
  const fly2="../Fly æ 4.png"
  const fly3="../Fly æ 3.png "
  const star="../star.svg "

  const logo="../landingPage/aerx_logo-removebg-preview 1 (Traced).svg"

  return (
  <>
 
  <WithDots>
    <Header  logo={logo}/>
    <HeroSection saly={saly} group1={group1} />
    <SectionOne group2={group2} group3={group3} handWriting={handWriting} star={star}/>
    <SectionTwo saly3={saly3} saly4={saly4} fly1={fly1} fly2={fly2} fly3={fly3} star={star} />
    <About frame={frame} polygon={polygon} />
    <NewsLetterForm saly1={saly1} saly2={saly2} frame1={frame1} frame2={frame2} frame3={frame3} star={star}/>
  </WithDots>


  </>
  )
}

export default Index;