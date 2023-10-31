"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import profile from '@components/Profile'
import Profile from '@components/Profile'


const myProfile = () => {
    const { data:session } = useSession()
    const [posts,setPosts] = useState([])
    const router = useRouter()
    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            
            setPosts(data)
        }
        console.log(posts)

        if (session?.user.id) {
            fetchPosts()
        }
    },[])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) =>{
        const hasConfirmed = confirm("Are You Sure You want to delete  this prompt? ")
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })
                const filteredPosts = posts.filter((p) => p._id !== post._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Profile 
            name = "My"
            desc = "WELCOME TO Personalized Profile page"
            data = {posts}
            handleEdit = {handleEdit}
            handleDelete = {handleDelete}

        />
    )
}

export default myProfile