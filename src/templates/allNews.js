// import React, { useEffect, useContext } from "react"
// import { Link } from "gatsby"
// import SmoothImage from "react-smooth-image"

// import Layout from "../components/layout"
// import { GlobalDispatchContext } from "../context/GlobalContextProvider"

// const asdasd = ({ data, pageContext }) => {
//   let Colcade
//   let tickerText

//   const formatContent = content => {
//     const splitContent = content.split("<p>")
//     const lastContent = splitContent.length
//     content = splitContent[lastContent - 1]
//     content = content.replace("</p>", "")
//     content = content.split(" ")
//     content[0] = `<b>${content[0]}</b>`
//     content[1] = `<b>${content[1]}</b>`
//     content = content.join(" ")
//     return content
//   }

//   return (
//     <Layout>
//       <div id="content" className="grid" style={{ marginTop: 50 }}>
//         <div className="grid-col grid-col--1"></div>
//         <div className="grid-col grid-col--2"></div>
//         <div className="grid-col grid-col--3"></div>
//         <div className="grid-col grid-col--4"></div>

//         {data.allWordpressWpNews.edges.map(
//           ({ node: { title, content, slug, acf } }, index) => {
//             const ratio = acf.news_post_image.height / acf.news_post_image.width
//             return (
//               <div
//                 style={{ marginTop: 10 }}
//                 className="flex-column justify-between grid-item"
//                 key={index}
//               >
//                 <Link to={`/news/${slug}`} style={{ textDecoration: "none" }}>
//                   <SmoothImage
//                     src={acf.news_post_image.url}
//                     alt={title}
//                     transitionTime={0.5}
//                     containerStyles={{
//                       paddingBottom: `${ratio * 100}%`,
//                     }}
//                     style={{ marginBottom: 0 }}
//                   />
//                   <div
//                     style={{ textDecoration: "none", color: "black" }}
//                     className="news-card-title"
//                     dangerouslySetInnerHTML={{ __html: formatContent(content) }}
//                   />
//                 </Link>
//               </div>
//             )
//           }
//         )}
//       </div>
//       <div
//         className="flex justify-center align-center"
//         style={{ position: "relative", height: 50, marginBottom: 50 }}
//       >
//         {currentPage !== 1 && currentPage > 3 && (
//           <Link className="pagination-item first" to={`/news/1`}>
//             1
//           </Link>
//         )}
//         {currentPage !== 1 && (
//           <Link
//             className="pagination-item prev"
//             to={`/news/${currentPage - 1}`}
//           >
//             {currentPage - 1}
//           </Link>
//         )}
//         <div className="pagination-item current">
//           <b>{currentPage}</b>
//         </div>
//         {currentPage === numOfPages ? null : (
//           <Link
//             className="pagination-item next"
//             to={`/news/${currentPage + 1}`}
//           >
//             {currentPage + 1}
//           </Link>
//         )}
//         {currentPage !== numOfPages && currentPage < numOfPages - 3 && (
//           <Link className="pagination-item last" to={`/news/${numOfPages}`}>
//             {numOfPages}
//           </Link>
//         )}
//       </div>
//     </Layout>
//   )
// }

// export default asdasd
