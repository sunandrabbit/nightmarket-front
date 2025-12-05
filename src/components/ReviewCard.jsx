export default function ReviewCard({ review }) {
  return (
    <div className="border-b py-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{review.user.name}</span>
        <span className="text-yellow-500">⭐ {review.rating}</span>
      </div>
      <p className="mt-2">{review.comment}</p>
      {review.imageUrl && (
        <img
          src={review.imageUrl}
          alt="리뷰 이미지"
          className="w-24 h-24 object-cover mt-2 rounded"
        />
      )}
      {review.replyIfo && (
        <div className="mt-2 ml-4 p-2 bg-gray-50 border rounded text-sm text-gray-600">
          <p>판매자 답변: {review.replyInfo.comment}</p>
        </div>
      )}
    </div>
  );
}
