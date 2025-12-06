import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPage: 1 });
  const [searchKeyword, setSearchKeyword] = useState(""); 

  const mockProducts = [
    {
      id: 1,
      name: "스마트폰 케이스",
      price: 15000,
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop",
      category: "accessories",
      description: "고급 실리콘 소재로 제작된 스마트폰 보호케이스",
      rating: 4.5,
      stock: 50
    },
    {
      id: 2,
      name: "무선 이어폰",
      price: 89000,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      category: "electronics",
      description: "노이즈 캔슬링 기능이 탑재된 프리미엄 무선 이어폰",
      rating: 4.8,
      stock: 30
    },
    {
      id: 3,
      name: "노트북 백팩",
      price: 45000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "bags",
      description: "15인치 노트북까지 수납 가능한 고급 백팩",
      rating: 4.3,
      stock: 25
    },
    {
      id: 4,
      name: "블루투스 스피커",
      price: 65000,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      category: "electronics",
      description: "방수 기능이 있는 포터블 블루투스 스피커",
      rating: 4.6,
      stock: 40
    },
    {
      id: 5,
      name: "운동화",
      price: 120000,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      category: "shoes",
      description: "편안하고 스타일리시한 캐주얼 운동화",
      rating: 4.4,
      stock: 35
    },
    {
      id: 6,
      name: "시계",
      price: 180000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: "accessories",
      description: "클래식한 디자인의 고급 손목시계",
      rating: 4.7,
      stock: 20
    }
  ];

  const fetchProducts = async (keyword = "") => {
    try {
      const res = await fetch(
        `http://localhost:10030/api/v1/posts/search?keyword=${keyword}&page=${pageInfo.currentPage - 1}`
      );
      if (res.ok) {
        const data = await res.json();
        const transformedProducts = (data.contents || []).map(product => ({
          id: product.productPostId,
          postId: product.productPostId, // API 호출용 ID
          name: product.name || '상품명 없음', 
          price: product.price || 0,
          image: product.imageUrl || '',
          description: '', // 목록에서는 설명이 없으므로 빈값
          rating: product.rating || 0,
          category: 'general' // 카테고리 정보가 없으므로 기본값
        }));
        setProducts(transformedProducts);
        setPageInfo({
          currentPage: data.currentPage + 1,
          totalPages: data.totalPage,
        });
      }
    } catch (error) {
      console.error("상품 목록 불러오기 오류:", error);
      setProducts([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">상품 목록</h2>

      {/* 검색 창 */}
      <div className="flex justify-center mb-4">
        <div className="flex w-3/5">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="상품명을 입력하세요"
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => fetchProducts(searchKeyword)}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            검색
          </button>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > 0 && (
        <p className="mt-6 text-gray-600">
          현재 페이지: {pageInfo.currentPage} / {pageInfo.totalPages}
        </p>
      )}
    </div>
  );
}
