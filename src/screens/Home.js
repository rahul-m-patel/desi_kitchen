import React, {useEffect,useState} from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

global.link = "https://1639-2600-4041-41c7-a900-4f0-f110-9069-90f8.ngrok-free.app"

export default function Home() {
  const [search,setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

  const loadData = async()=>{
    let response = await fetch(global.link+"/api/foodData",{
      method : "POST",
      headers:{
        'Content-Type':'application/json'
      }
    });

    response = await response.json();
    //console.log(response[0],response[1]);
    setFoodItem(response[0])
    setFoodCat(response[1])

  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
      <div> <Navbar></Navbar> </div>
      <div> 
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-warning" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?food" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
      <div className="container"> 
        {
          foodCat!==[] ? foodCat.map((data)=>{
            return(
              <div className='row mb-3'>
              <div key={data._id} className="fs-3 m-3"> {data.CategoryName} </div>
              <hr></hr>
              { foodItem!==[]? foodItem.filter((item)=>item.CategoryName===data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(
                filterItems=>{
                  return(
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems}
                      options = {filterItems.options[0]}
                      ></Card>
                      </div>
                  )
                }
              ): <div> No Such Data Found </div>}
              </div>
            )
          }):""
        }
      </div>
      <div> <Footer></Footer> </div>
    </div>
  )
}
