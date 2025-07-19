import React from "react";
import Pagination from "../common/Pagination";
import { Product } from "../productcards/ProductCard";
import ProductCard1 from "../productcards/ProductCard1";

interface GridViewProps {
  products: Product[];
  pagination?: boolean;
}

const GridView: React.FC<GridViewProps> = ({ products, pagination = true }) => {
  return (
    <>
      {products.map((product, index) => (
        <ProductCard1 key={index} product={product} gridClass="grid" />
      ))}
      {/* pagination */}
      {pagination ? (
        <ul className="wg-pagination justify-content-center">
          <Pagination totalPages={3} />
        </ul>
      ) : null}
    </>
  );
}

export default GridView;