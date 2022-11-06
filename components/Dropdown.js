import Link from "next/link";
import cateItems from "../dummydata/menuitem.json";

const Dropdown = () => {
  return (
    <div className="dropdown inline-block relative">
      <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span>카테고리</span>
      </button>

      <ul className="dropdown-content hidden absolute w-full  text-gray-700 pt-1">
        {cateItems.map((itemLevelOne) => {
          return (
            <li className="dropdown" key={itemLevelOne.main_name}>
              <div className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40  whitespace-no-wrap">
                {itemLevelOne.main_name}
              </div>

              <ul className="dropdown-content absolute hidden text-gray-700 left-40 -mt-16">
                {itemLevelOne.item.map((itemLevelTwo) => {
                  return (
                    <li className="cursor-pointer" key={itemLevelTwo.item_name}>
                      <Link href={`/homepage/cate/${itemLevelTwo.cate_id}`}>
                        <div className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40 whitespace-no-wrap">
                          {itemLevelTwo.item_name}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      {/* 드랍다운 */}
      {/* <ul className="dropdown-content hidden absolute w-full  text-gray-700 pt-1">
        {cateItems.map((itemLevelOne) => {
          return (
            <li className="dropdown" key={itemLevelOne.main_name}>
              <div className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40  whitespace-no-wrap">
                {itemLevelOne.main_name}
              </div>

              <ul className="dropdown-content absolute hidden text-gray-700 left-40 -mt-16">
                {itemLevelOne.item.map((itemLevelTwo) => {
                  return (
                    <li className="cursor-pointer" key={itemLevelTwo.item_name}>
                      <Link href={`/homepage/cate/${itemLevelTwo.item_name}`}>
                        <div className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40 whitespace-no-wrap">
                          {itemLevelTwo.item_name}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Dropdown;
