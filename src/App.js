import {useState,useEffect,useRef} from 'react'
const placeholder="e.g. eggs";

const App=()=>{
const [items,setItems]=useState([]);
const [itemlistEmpty,setListEmpty]=useState(false);
const [itemEditing, setIsItemEditing]=useState(false);
const [idtobeEdited, setidtobeEdited]=useState(0);
const [submit,setSubmit]=useState(false);


const myRef=useRef('');

const handleSubmit=()=>{
  if(itemEditing){
      const newItems=items.map((item)=>{
       if(item.key===idtobeEdited){
          item.name=myRef.current.value;   
       }
       return item;
      })
  myRef.current.value='';   
   setIsItemEditing(false);
      setItems(newItems);
      setSubmit(true);
  return;
    }

  setItems([...items,{name:myRef.current.value,key:items.length+1}]);
  myRef.current.value='';
  if(!itemlistEmpty)
  setListEmpty(true);
  setSubmit(true);
}

  return (
    <>
      <div class="card" style={{ width: "25rem", marginTop:'5rem'}}>
        <h2 style={{display:'flex', justifyContent:'center',height:'5rem', lineHeight:'5rem'}}>Grocery List</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input type="text" placeholder={placeholder} ref={myRef} style={{width:'90%'}} />
          <button type="button" onClick={handleSubmit}>
            {!itemEditing && <p>Submit</p>}
            {itemEditing && <p>Edit</p>}
          </button>
        </div>
        {itemlistEmpty && (
          <ul class="list-group">
            {items.map((item) => {
              return (
                <li
                  className="list-group-item"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{item.name}</h3>
                  <div>
                    <button
                      type="button"
                      class="btn btn-success btn-sm"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => {
                        myRef.current.value = item.name;
                        setIsItemEditing(true);
                        setidtobeEdited(item.key);
                      }}
                    >
                      Edit text
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      onClick={() => {
                        setItems(
                          items.filter((sitem) => sitem.key !== item.key)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <button
          type="button" style={{height:'2rem'}}
          onClick={() => window.location.reload()}
        >
          <p style={{color:'red'}}>Clear all items</p>
        </button>
      </div>
    </>
  );
}

export default App;
