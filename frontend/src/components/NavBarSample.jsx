// import { Menu } from "lucide-react";
// import React from "react";

// function NavBarSample() {
//   return (
//     // <div className="flex justify-center">
//     //   <h2 className="text-2xl font-bold text-green-400 lg:hidden md:block xl:block md:text-yellow-400 xl:text-purple-400">
//     //     Hello World - hi
//     //   </h2>
//     // </div>
//     <div className="w-full h-20 px-32 py-10">
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-600 sm:text-white lg:text-orange-400 sm:text-green-400 md:text-yellow-400 xl:text-purple-400">
//             STORA
//           </h1>
//         </div>
//         <div>
//           {/* <div className="lg:hidden xl:hidden md:hidden sm:block">
//             <Menu />
//           </div> */}
//           {/* <div className="gap-6 sm:hidden md:block lg:block xl:block">
//             <button className="px-4 py-2 bg-yellow-400 rounded-xl">Cart</button>
//             <button className="px-4 py-2 bg-red-400 rounded-xl">Logout</button>
//           </div> */}
//           <div className="flex md:hidden">
//             {/* Content for small screens (optional) */}
//             <Menu />
//           </div>

//           <div className="hidden gap-6 md:flex">
//             <button className="px-4 py-2 bg-yellow-400 rounded-xl">Cart</button>
//             <button className="px-4 py-2 bg-red-400 rounded-xl">Logout</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBarSample;

import { Menu } from "lucide-react";
import React from "react";

function NavBarSample() {
  return (
    <div className="w-full h-20 px-32 py-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-600 sm:text-white lg:text-orange-400 sm:text-green-400 md:text-yellow-400 xl:text-purple-400">
            STORA
          </h1>
        </div>

        <div className="flex items-center">
          {/* Menu icon for small screens */}
          <div className="md:hidden">
            <Menu />
          </div>

          {/* Buttons only visible on medium and larger screens */}
          <div className="hidden gap-6 md:flex">
            <button className="px-4 py-2 bg-yellow-400 rounded-xl">Cart</button>
            <button className="px-4 py-2 bg-red-400 rounded-xl">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarSample;
