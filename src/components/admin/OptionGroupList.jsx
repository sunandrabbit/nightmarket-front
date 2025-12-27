import { OptionValueList } from "./OptionValueList";

export function OptionGroupList({ groups }) {
  return (
    <div className="space-y-4">
      {groups.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          옵션 그룹을 추가해주세요
        </p>
      ) : (
        groups.map((group, index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="font-semibold mb-2">{group.name}</h2>
            <OptionValueList values={group.values} />
          </div>
        ))
      )}
    </div>
  );
}