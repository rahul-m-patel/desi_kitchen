import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options)
  let foodItem = props.foodItem;
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")
  let data = useCart();

  const handleAddToCart= async ()=>{
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img})
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
        <div class="card mt-3" style={{"width":"18rem", "maxHeight":"500px"}}>
          <img src={props.foodItem.img} class="card-img-top" alt="..." style={({height:"200px", objectFir:"fill"})}></img>
            <div class="card-body">
              <h5 class="card-title">{props.foodItem.name}</h5>
              {/* <p class="card-text">{props.foodItem.description}</p> */}
              <div className="container w-100">
                <select className='m-2 h-100 bg-warning rounded' onChange={(e)=>setQty(e.target.value)}>
                  {Array.from(Array(6), (e,i)=>{
                    return(
                      <option key={i+1} value={i+1}> {i+1} </option>
                    )
                  })}
                </select>
                <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                  {priceOptions.map((data)=>{
                    return <option key = {data} value={data}>{data}</option>
                  })}
                </select>
                <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
              </div>
              <hr></hr>
              {(localStorage.getItem("authToken")) ?
              <button className={'btn btn-warning justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
              : ""}
            </div>

        </div>
    </div>
  )
}
