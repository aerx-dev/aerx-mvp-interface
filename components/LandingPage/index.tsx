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
  const saly='../Saly-1.png'
  const group1='../Group 5394.png'

  const saly1='../Saly-44.png'
  const saly2='../Saly-15.png'
  const frame1='../frame 5176.svg'
  const frame2='../vector.png'
  const frame3='../frame 5171.png'

  const group2="../landingPage/Group 5389.png"
  const  group3="../landingPage/Group 5388.png"
  const handWriting="../landingPage/Saly-25.png"

  const saly3="../Saly-35.png "
  const saly4="../Saly-34.png "

  const logo="../landingPage/aerx_logo-removebg-preview 1 (Traced).svg"

  return (
  <>
 
  <WithDots>
    <Header  logo={logo}/>
    <HeroSection saly={saly} group1={group1} />
    <SectionOne group2={group2} group3={group3} handWriting={handWriting} />
    <SectionTwo saly3={saly3} saly4={saly4} />
    <About frame={frame} />
    <NewsLetterForm saly1={saly1} saly2={saly2} frame1={frame1} frame2={frame2} frame3={frame3} />
  </WithDots>


  </>
  )
}

export default Index;