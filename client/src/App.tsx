import React from 'react'
import ListProduct from './pages/listProduct/ListProduct'
import ProjectManagemnet from './pages/cart/ProjectManagemnet'

export default function App() {
  return (
    <div  style={{display:"flex", justifyContent:"space-evenly"}}>
      <ListProduct></ListProduct>
      <ProjectManagemnet></ProjectManagemnet>
    </div>
  )
}
