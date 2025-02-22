import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()

    const [allCources, setAllCources] = useState([])
    const [isEducator, setIsEducator] = useState(true)


    // Fetch All Cources
    const fetchAllCources = async () => {
        setAllCources(dummyCourses)
    }

    // Calcute average rating of cource
    const calcuteRating = (course) => {
        
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        })
        
        return totalRating / course.courseRatings.length
    }

    // Calculate Course Chapter Time
    const calcuteChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time*60*1000, {units: ["h", "m"]})
    }

    // Calcute Course Duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time*60*1000, {units: ["h", "m"]})
    }

    // Calculate Number of Lectures in the Course
    const calculateNumberOfLectures = (course) => {
        let totalLecture = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)) {
                totalLecture += chapter.chapterContent.length
            }
        })
        return totalLecture;
    }

    useEffect(() => {
        fetchAllCources(); 
    }, [])

    const value = {
        currency,
        allCources,
        navigate,
        calcuteRating,
        isEducator, setIsEducator,
        calculateCourseDuration, calculateNumberOfLectures, calcuteChapterTime
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}