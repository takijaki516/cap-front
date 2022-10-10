import Link from "next/link";
import cateItems from "../dummydata/menuitem.json";

const Dropdown = () => {
  return (
    <div class="dropdown inline-block relative">
      <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span>카테고리</span>
      </button>
      <ul className="dropdown-content hidden absolute w-full  text-gray-700 pt-1">
        {cateItems.map((item1) => {
          return (
            <li className="dropdown">
              <div className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40  whitespace-no-wrap">
                {item1.main_name}
              </div>

              <ul className="dropdown-content absolute hidden text-gray-700 left-40 -mt-16">
                {item1.item.map((item2) => {
                  return (
                    <li className="cursor-pointer">
                      <Link href={`/homepage/cate/${item2.item_name}`}>
                        <div className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block w-40 whitespace-no-wrap">
                          {item2.item_name}
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
    </div>
  );
};

export default Dropdown;
