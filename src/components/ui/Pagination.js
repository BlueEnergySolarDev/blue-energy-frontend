import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginaActual } from '../../actions/eventos';

export const Pagination = ({dataPerPage,totalData,data,setCurrentPage}) => {
    const dispatch = useDispatch();
    const pageNumbers = [];
    const [pageLimit, setPageLimit] = useState(10);
    for(let i= 1;i<=Math.ceil(totalData/dataPerPage);i++){
        pageNumbers.push(i);
    }
    const { currentPage } = useSelector((state) => state.eventos);

    const paginate = (pageNumber) => {
        const maxPage = Math.ceil(data.length/dataPerPage);
        setCurrentPage(pageNumber);
        dispatch(paginaActual(pageNumber));
        var last = document.getElementsByClassName('last');
        // last[0].classList.remove('disabled');
        var first = document.getElementsByClassName('first');
        // first[0].classList.remove('disabled');
        if(pageNumber === maxPage){
          // last[0].classList.add('disabled');
        }
        if(pageNumber===1){
          // first[0].classList.add('disabled');
        }
    };
    const select = (e) => {
        var li = document.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
          li[i].classList.remove('active')
        }
        e.target.parentElement.classList.add('active');
    };
    const goToNextPage = pageNumber => {
      console.log(pageNumber)
        var li = document.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
          if(li[i].innerText===pageNumber.toString()){
            // li[pageNumber+2].classList.add('active');
          }else{
            // li[pageNumber+1].classList.remove('active');
          }
        }
        const maxPage = Math.ceil(data.length/dataPerPage);
        var last = document.getElementsByClassName('last');
        // last[0].classList.remove('disabled');
        var first = document.getElementsByClassName('first');
        // first[0].classList.remove('disabled');
        if(pageNumber !== maxPage){
          setCurrentPage((pageNumber)=>pageNumber+1);
          dispatch(paginaActual(pageNumber+1));
        }
        if(pageNumber === maxPage-1){
          // last[0].classList.add('disabled');
        }
    };
    const goToPreviousPage = pageNumber => {
      
        var li = document.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
          if(li[i].innerText===pageNumber.toString()){
            // li[pageNumber].classList.add('active');
          }else{
            // li[pageNumber+1].classList.remove('active');
          }
        }
        var first = document.getElementsByClassName('first');
        // first[0].classList.remove('disabled');
        // var last = document.getElementsByClassName('last');
        // last[0].classList.remove('disabled');
        if(pageNumber!==1){
          setCurrentPage((pageNumber)=>pageNumber-1);
          dispatch(paginaActual(pageNumber-1));
        }
        if(pageNumber===2){
          // first[0].classList.add('disabled');
        }
    };
    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      let paginas = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
      
      return paginas;
    };


    return (
    <nav>
        <ul className="pagination">
        <li className="page-item first">
                <span onClick={()=>goToPreviousPage(currentPage)} className="page-link">
                <i className="fas fa-arrow-circle-left"></i>
                </span>
            </li>
            {getPaginationGroup().map(number=>(
            <li onClick={(e)=>select(e)} key={number} className={number===1 ? "page-item active":"page-item"}>
                <span onClick={()=>paginate(number)} className="page-link">
                    {number}
                </span>
            </li>
            ))}
            <li className="page-item last">
                <span onClick={()=>goToNextPage(currentPage)} className="page-link">
                <i className="fas fa-arrow-circle-right"></i>
                </span>
            </li>
        </ul>
    </nav>
);
};
