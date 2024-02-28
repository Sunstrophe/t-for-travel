import React from "react";

function ExpShort() {
    return (
        <div className="grid grid-rows-2 bg-green-200 border-2 border-black rounded-lg w-60 h-80">
            <div className="rounded-t-lg bg-cover bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/8f/Stockholm_city_hall_050701.jpg')]"></div>
            <div className="grid grid-cols-3 gap-2 m-2">
                <div className="flex flex-col justify-between col-span-2">
                    <p className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, doloremque!</p>
                    <button className="p-2 border border-black rounded-md hover:bg-green-300">Details</button>
                </div>
                <div className="flex flex-col justify-between col-span1">
                    <div><p>Extra info</p></div>
                    <div className="flex justify-center mx-auto bg-green-600 border border-black rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                            <path d="M360-240h220q17 0 31.5-8.5T632-272l84-196q2-5 3-10t1-10v-32q0-17-11.5-28.5T680-560H496l24-136q2-10-1-19t-10-16l-29-29-184 200q-8 8-12 18t-4 22v200q0 33 23.5 56.5T360-240ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpShort;
