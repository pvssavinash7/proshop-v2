// import React from 'react';
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';


// const Paginate = ({pages, page, isAdmin = false, keyword = ''}) => {
//   return (
//     pages > 1 && (
//         <Pagination>
//             {[...Array(pages).keys()].map((x) => (
//               <LinkContainer
//               key={x+1}
//               to={
//                 !isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productlist/${x+1}`
//               }>
//                 <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
//               </LinkContainer>
//             ))}
//         </Pagination>
//     )
//   ) 
// } 

// export default Paginate



import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    pages > 1 && (
      <Pagination>
        {range(Math.max(1, page - 5), Math.min(page + 4, pages)).map((x) => (
          <LinkContainer
            key={x}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x}`
                  : `/page/${x}`
                : `/admin/productlist/${x}`
            }
          >
            <Pagination.Item active={x === page}>{x}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
