import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

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

    useEffect(() => {
        fetchAllCources(); 
    }, [])

    const value = {
        currency,
        allCources,
        navigate,
        calcuteRating,
        isEducator, setIsEducator
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}