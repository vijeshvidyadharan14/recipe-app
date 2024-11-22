import React, { useEffect, useState } from 'react'
import {Card, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe, searchRecipe } from '../store/slice/recipeSlicie'
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch()
  const {allRecipes,loading,errorMsg} = useSelector(state=>state.recipeReducer)
  // console.log(allRecipes,loading,errorMsg);

  useEffect(()=>{
    dispatch(fetchRecipe())
  },[])

  const [currentPage,setCurrentPage] = useState(1)
  const recipesPerPage = 12
  const totalPages = Math.ceil(allRecipes?.length/recipesPerPage)
  const currentPageLastIndux = currentPage * recipesPerPage
  const currentPageFirstIndux = currentPageLastIndux - recipesPerPage
  const visibleRecipes = allRecipes?.slice(currentPageFirstIndux,currentPageLastIndux)

  const nextpage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const prevpage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <div style={{minHeight:'100vh'}} className=''>
      <h1 className='text-center my-5'>Recipe Book</h1>
      <div className="input-group w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search dishes"
          onChange={e=>dispatch(searchRecipe(e.target.value.toLowerCase()))}
          />
        <span className="input-group-text" ><i className="fa-solid fa-magnifying-glass"></i></span>
      </div>

      {
        loading ?
        <div style={{minHeight:"60vh"}} className="d-flex flex-column justify-content-center align-items-center">
          <img width={'200px'} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEO1m-2p6bxZvDYTAYAVyI3qbBLSWXfZB1Zc767VZXmp3EVEG1sf1T_pREx50jtMtRK2RtRoBpynzwf_r1gYu6ABj_tnMrFa_8A6m0Qqb86yTtaSqDCWmARZ8ST9ak3Uv2ahvYYr0TbUg/s1600/1.gif" alt="no img" />
          <span>Loading...</span>
        </div>
        :
        <div className="container mt-5 ">
          <Row lg={4} md={3} sm={2} xs={1} >
              {
                allRecipes?.length>0 ?
                visibleRecipes.map(recipe=>(
                  <Col key={recipe?.id}>
                    <Card className='mb-5' style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={recipe?.image} />
                      <Card.Body>
                        <Card.Title>{recipe?.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{recipe?.cuisine}</Card.Subtitle>
                        <Link to={`/${recipe?.id}/view`} className='btn btn-outline-dark border-0'>View More...</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
                :
                <h2 className='text-secondary text-center'>No Recipes Found</h2>
              }
          </Row>
        </div>
      }

      <div className="text-center mb-5">
        <span onClick={prevpage}><i className="fa-solid fa-backward me-3"></i></span>
        <span>{currentPage} of {totalPages} </span>
        <span onClick={nextpage}><i className="fa-solid fa-forward ms-3"></i></span>
      </div>

    </div>
  )
}

export default Home