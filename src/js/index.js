const genreList = document.getElementById('genreList');
const addGenreForm = document.getElementById('addGenreForm');
const addGenreInput = document.getElementById('addGenreInput');

const catList = JSON.parse(localStorage.getItem('categories'));
if (catList === null) {
  const categoryList = ['- Categories -', 'Criminal', 'Sci-fi', 'Drama', 'Science', 'Fairy tale'];
  localStorage.setItem('categories', JSON.stringify(categoryList));
}
const CategoryUpdate = () => {
  genreList.innerHTML = '';
  const updatedCategoryList = JSON.parse(localStorage.getItem('categories'));
  updatedCategoryList.forEach((element) => {
    const singleCategory = document.createElement('option');
    genreList.appendChild(singleCategory);
    singleCategory.classList.add('app_form--selectOptions');
    singleCategory.innerHTML = element;
    singleCategory.value = element;
  });
};
CategoryUpdate();

addGenreForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const updatedCategoryList = JSON.parse(localStorage.getItem('categories'));
  updatedCategoryList.push(addGenreInput.value);
  localStorage.setItem('categories', JSON.stringify(updatedCategoryList));
  CategoryUpdate();
  addGenreForm.reset();
});

const addBookForm = document.getElementById('addBookForm');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const radioToCheck = document.querySelectorAll('.app_form--radioOptions');

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = [];
  newBook.push(bookTitle.value);
  newBook.push(bookAuthor.value);
  const selectToCheck = document.querySelectorAll('.app_form--selectOptions');
  selectToCheck.forEach((element) => {
    if (element.selected === true) {
      newBook.push(element.value);
    }
  });
  radioToCheck.forEach((element) => {
    if (element.checked === true) {
      newBook.push(element.value);
    }
  });
  const newBook2 = [newBook];
  const loadedList = JSON.parse(localStorage.getItem('myBooks'));
  if (loadedList === null) {
    localStorage.setItem('myBooks', JSON.stringify(newBook2));
  } else {
    loadedList.push(newBook);
    localStorage.setItem('myBooks', JSON.stringify(loadedList));
  }
  addBookForm.reset();
  ListUpdate();
});

const ListUpdate = () => {
  const tableList = document.getElementById('tableList');
  tableList.innerHTML = '';
  let position = 1;
  const loadedList = JSON.parse(localStorage.getItem('myBooks'));
  if (loadedList === null) {
    const newRow = tableList.insertRow(-1);
    newRow.classList.add('app_table--row');
    const positionData = newRow.insertCell(-1);
    positionData.innerHTML = 'Add your first book!';
  } else {
    for (let i = 0; i < loadedList.length; i++) {
      const newRow = tableList.insertRow(-1);
      newRow.classList.add('app_table--row');
      newRow.setAttribute('id', `Row${i}`);
      newRow.setAttribute('contenteditable', 'true');
      const positionData = newRow.insertCell(-1);
      positionData.classList.add('app_table--positionData');
      const titleData = newRow.insertCell(-1);
      titleData.classList.add('app_table--titleData');
      titleData.setAttribute('id', `Title${i}`);
      const authorData = newRow.insertCell(-1);
      authorData.classList.add('app_table--authorData');
      authorData.setAttribute('id', `Author${i}`);
      const priorityData = newRow.insertCell(-1);
      priorityData.classList.add('app_table--priorityData');
      priorityData.setAttribute('id', `Priority${i}`);
      const categoryData = newRow.insertCell(-1);
      categoryData.classList.add('app_table--categoryData');
      categoryData.setAttribute('id', `Category${i}`);
      positionData.innerHTML = position;

      titleData.innerHTML = `${loadedList[i][0]}`;
      authorData.innerHTML = `${loadedList[i][1]}`;
      priorityData.innerHTML = `${loadedList[i][3]}`;
      categoryData.innerHTML = `${loadedList[i][2]}`;

      const editIcon = newRow.insertCell(-1);
      editIcon.classList.add('fas');
      editIcon.classList.add('fa-edit');

      const deleteIcon = newRow.insertCell(-1);
      deleteIcon.classList.add('far');
      deleteIcon.classList.add('fa-trash-alt');

      const newRowToDelete = document.getElementById(`Row${i}`);
      deleteIcon.addEventListener('click', () => {
        newRowToDelete.innerHTML = '';
        loadedList.splice(i, 1);
        window.location.reload();
        localStorage.setItem('myBooks', JSON.stringify(loadedList));
      });
      position++;
    }
  }
};
ListUpdate();

const printButton = document.getElementById('printButton');
printButton.addEventListener('click', () => {
  window.print();
});

const sortForm = document.getElementById('sortForm');
sortForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loadedList = JSON.parse(localStorage.getItem('myBooks'));
  const sortSelectToCheck = document.querySelectorAll('.app_form--selectOptionsSort');
  sortSelectToCheck.forEach((element) => {
    if (element.selected === true) {
      if (element.value === 'Priority') {
        const sortedList = loadedList.sort((a, b) => {
          return b[3] - a[3];
        });
        localStorage.setItem('myBooks', JSON.stringify(sortedList));
        ListUpdate();
      }
      if (element.value === 'Author') {
        const sortedList = loadedList.sort((a, b) => {
          return a[1].localeCompare(b[1]);
        });
        localStorage.setItem('myBooks', JSON.stringify(sortedList));
        ListUpdate();
      }
      if (element.value === 'Category') {
        const sortedList = loadedList.sort((a, b) => {
          return a[2].localeCompare(b[2]);
        });
        localStorage.setItem('myBooks', JSON.stringify(sortedList));
        ListUpdate();
      }
    }
  });
});

const filterByInput = document.getElementById('filterByInput');
const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loadedList = JSON.parse(localStorage.getItem('myBooks'));
  const myFilter = loadedList.filter((element) => {
    return (
      element[1] === filterByInput.value ||
      element[2] === filterByInput.value ||
      element[3] === filterByInput.value
    );
  });
  const tableList = document.getElementById('tableList');
  tableList.innerHTML = '';
  let position = 1;
  if (myFilter.length === 0) {
    const newRow = tableList.insertRow(-1);
    newRow.classList.add('app_table--row');
    const positionData = newRow.insertCell(-1);
    positionData.innerHTML = 'Nothing to display';
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    for (let i = 0; i < myFilter.length; i++) {
      const newRow = tableList.insertRow(-1);
      newRow.classList.add('app_table--row');
      newRow.setAttribute('id', `Row${i}`);
      newRow.setAttribute('contenteditable', 'true');
      const positionData = newRow.insertCell(-1);
      positionData.classList.add('app_table--positionData');
      const titleData = newRow.insertCell(-1);
      titleData.classList.add('app_table--titleData');
      titleData.setAttribute('id', `Title${i}`);
      const authorData = newRow.insertCell(-1);
      authorData.classList.add('app_table--authorData');
      authorData.setAttribute('id', `Author${i}`);
      const priorityData = newRow.insertCell(-1);
      priorityData.classList.add('app_table--priorityData');
      priorityData.setAttribute('id', `Priority${i}`);
      const categoryData = newRow.insertCell(-1);
      categoryData.classList.add('app_table--categoryData');
      categoryData.setAttribute('id', `Category${i}`);
      positionData.innerHTML = position;
      titleData.innerHTML = `${myFilter[i][0]}`;
      authorData.innerHTML = `${myFilter[i][1]}`;
      priorityData.innerHTML = `${myFilter[i][3]}`;
      categoryData.innerHTML = `${myFilter[i][2]}`;
      position++;
    }
  }
});
const refreshingButton = document.getElementById('refreshingButton');
refreshingButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.reload();
});
