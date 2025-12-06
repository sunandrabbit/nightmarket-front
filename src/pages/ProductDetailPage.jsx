import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const { addToCart, updateQuantity, cartItems } = useCart();

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://item.syua-test.duckdns.org"
      : "http://localhost:10030";

  const handleSelectOption = (groupName, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: option, // 그룹 이름 기준으로 선택값 저장
    }));
  };

  const calculateTotalPrice = () => {
    const basePrice = post.productInfo.price || 0;
    const optionPrice = Object.values(selectedOptions).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );
    return basePrice + optionPrice;
  };

  const selectedOptionNames = Object.values(selectedOptions)
    .map((opt) => opt.name)
    .join(" + ");

  // const makeSelectedOptionsKey = (selectedOptions) => {
  //   const map = Object.keys(selectedOptions)
  //     .sort()
  //     .reduce((acc, k) => {
  //       acc[k] = selectedOptions[k].optionValueId;
  //       return acc;
  //     }, {});
  //   return JSON.stringify(map);
  // };  

  const handleAddToCart = () => {
    if (!Object.keys(selectedOptions).length) {
      alert("옵션을 선택해주세요.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    // 선택한 옵션들의 ID 집합
    const selectedOptionIds = Object.values(selectedOptions).map(
      (opt) => opt.optionValueId
    );

    // 🔹 variants 배열에서 매칭되는 variant 찾기
    const matchedVariant = variants.find((variant) => {
      const variantIds = (variant.variantOptionValue || []).map(
        (vo) => vo.optionValueId
      );
      return (
        selectedOptionIds.length === variantIds.length &&
        selectedOptionIds.every((id) => variantIds.includes(id))
      );
    });

    if (!matchedVariant) {
      alert("선택하신 옵션 조합은 유효하지 않습니다.");
      return;
    }

    // 🔹 장바구니에 동일한 상품이 있는지 확인
    const existingItem = cartItems.find(
      (item) => item.productVariantId === matchedVariant.productVariantId
    );

    if (existingItem) {
      // 이미 존재하면 수량 증가
      updateQuantity(existingItem.shoppingBasketId, existingItem.quantity + 1);
      alert("장바구니에 상품이 담겼습니다.")
    } else {
      // 없으면 새로 추가
      addToCart({
        productVariantId: matchedVariant.productVariantId,
        name: `${post.productInfo.name}${
          selectedOptionNames ? ` (${selectedOptionNames})` : ""
        }`,
        price: totalPrice,
        quantity: 1,
      });
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const postRes = await fetch(`${API_BASE_URL}/api/v1/posts/${id}`);
        const postData = await postRes.json();
        setPost(postData);

        const reviewsRes = await fetch(
          `${API_BASE_URL}/api/v1/posts/${id}/reviews`
        );
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.reviewList || []);

        const optionsRes = await fetch(
          `${API_BASE_URL}/api/v1/products/${postData.productInfo.productId}/options`
        );
        const optionsData = await optionsRes.json();
        setOptions(optionsData.optionGroupList || []);

        const variantsRes = await fetch(
          `${API_BASE_URL}/api/v1/products/${postData.productInfo.productId}/combination`
        );
        const variantsData = await variantsRes.json();
        setVariants(variantsData.productVariantList || []);

      } catch (error) {
        console.error("상품 상세 불러오기 오류:", error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!post) return <p className="p-4 text-gray-500">로딩중...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 상품 이미지 + 기본정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={
            post.detailImageInfoList?.find((img) => img.ImageType === "THUMBNAIL")
              ?.imageUrl || "/no-image.png"
          }
          alt={post.productInfo.name}
          className="w-full h-80 object-cover rounded-lg shadow"
        />

        <div>
          <h2 className="text-2xl font-bold">{post.productInfo.name}</h2>
          <p className="text-gray-600 mt-2">{post.productInfo.description}</p>
          <p className="mt-4 text-xl font-semibold text-red-500">
            {post.productInfo.price}원
          </p>
          <p className="text-yellow-500">⭐ {post.rating}</p>

          <button 
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            장바구니 담기
          </button>
        </div>
      </div>
      
      {/* 옵션 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">옵션 선택</h3>
        {options.map((group) => (
          <div key={group.optionGroupId} className="mb-4">
            <p className="font-medium">
              {group.name}
              {selectedOptions[group.optionGroupId] && (
                <span className="ml-2 text-sm text-blue-600">
                  (선택됨: {selectedOptions[group.optionGroupId].name})
                </span>
              )}
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {group.optionValueList.map((opt) => {
                const isSelected =
                  selectedOptions[group.optionGroupId]?.optionValueId === opt.optionValueId;
                return (
                  <button
                    key={opt.optionValueId}
                    onClick={() => handleSelectOption(group.name, opt)}
                    className={`px-3 py-1 border rounded transition
                      ${selectedOptions[group.name]?.optionValueId === opt.optionValueId ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                  >
                    {opt.name} {opt.price > 0 && `( +${opt.price.toLocaleString()}원 )`}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 최종 가격 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-semibold">
          최종 가격:{" "}
          <span className="text-red-500">
            {calculateTotalPrice().toLocaleString()}원
          </span>
          {selectedOptionNames && (
            <span className="ml-2 text-gray-600">({selectedOptionNames})</span>
          )}
        </p>
      </div>


      {/* 리뷰 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">리뷰</h3>
        {reviews.length > 0 ? (
          reviews.map((review, idx) => <ReviewCard key={idx} review={review} />)
        ) : (
          <p className="text-gray-500">리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

