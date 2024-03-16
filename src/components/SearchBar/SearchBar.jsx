import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({onSubmit}) {
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const form = evt.target;
        const {searchField} = form.elements;
        searchField.value !=="" ? onSubmit(searchField.value): toast.error("Search field is empty");
        searchField.value = "";
      };
      
    return (
        <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchField"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
        <Toaster/>
      </header>
      
    );
  }
  