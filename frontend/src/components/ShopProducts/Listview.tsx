import React from "react";
import ProductCards6 from "../productcards/ProductCards6";
import { Product } from "../productcards/ProductCard";
import Pagination from "../common/Pagination";


interface ListViewProps {
  products: Product[],
  pagination?: boolean;
}

const Listview:React.FC<ListViewProps> = ({ products,pagination = true  }) =>  {
  return (
    <>
      {/* card product list 1 */}
      {products.map((product, i) => (
        <ProductCards6 product={product} key={i} />
      ))}
      {/* pagination */}
      {pagination ? (
        <ul className="wg-pagination ">
          <Pagination  totalPages={2}/>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default Listview;
