import "./App.css";

import Graph from "./components/Graph";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-9 ">
      {/* <div className=" justify-center mx-auto max-w-6xl"> */}
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
          Expense Tracker
        </h1>
      {/* </div> */}

        {/* grid column*/}
        {/*  after medium devices we have two column */}
        <div className='grid md:grid-cols-2 gap-4'>
          {/* chart  */}
          <Graph />
          {/* Form */}
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
