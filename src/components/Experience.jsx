import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { moments } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import Icon from "./Icon";

const MOMENT_COLOURS = ["#FFC93C", "#6FB8FF", "#5CC46A", "#B9A3FF"];

const MomentCard = ({ moment, index }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#FFFFFF",
      color: "#003B4A",
      boxShadow: "6px 6px 0 0 #003B4A",
      border: "2px solid #003B4A",
      borderRadius: 16,
      padding: "24px 26px",
    }}
    contentArrowStyle={{ borderRight: "9px solid #003B4A" }}
    date={moment.time}
    iconStyle={{ background: MOMENT_COLOURS[index % 4], color: "#003B4A", boxShadow: "0 0 0 2px #003B4A, 3px 3px 0 2px #003B4A" }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <Icon name={moment.icon} className='w-[45%] h-[45%]' />
      </div>
    }
  >
    <p className='text-[12px] uppercase tracking-[0.2em] text-gold font-semibold' style={{ margin: 0 }}>
      {moment.tag}
    </p>
    <h3 className='font-display text-cream text-[22px] font-semibold mt-2'>{moment.title}</h3>
    <ul className='mt-4 space-y-2.5'>
      {moment.points.map((point, i) => (
        <li key={i} className='flex gap-2.5 text-secondary text-[14px] leading-[22px]'>
          <Icon name='check' className='w-4 h-4 mt-[3px] text-gold shrink-0' strokeWidth={2.25} />
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <>
    <motion.div variants={textVariant()} className='text-center'>
      <p className={styles.sectionSubText}>From sunrise to late night</p>
      <h2 className={`${styles.sectionHeadText} mt-3`}>
        Built for <span className='marker'>every part</span> of the day.
      </h2>
    </motion.div>

    <div className='mt-16 flex flex-col'>
      <VerticalTimeline lineColor='#8A5100'>
        {moments.map((m, i) => (
          <MomentCard key={m.time} moment={m} index={i} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "day");
