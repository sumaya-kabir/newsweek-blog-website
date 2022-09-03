const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories => {
    categories.forEach(category => {
        // console.log(categories);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick="loadNews('${category.category_id}');toggleSpinner(true);resultFound('${category.category_id}')" class="tabs"> 
        <a class="tab mb-8">${category.category_name}</a> 
      </div>
        `;

        categoryContainer.appendChild(categoryDiv);
    })
    
}

const loadNews = async (category_id) => {
    const url = `
    https://openapi.programming-hero.com/api/news/category/${category_id}
    `;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newsAll => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newsAll.forEach(news => {
        const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
    
                <div class="my-12 p-12 card lg:card-side bg-gray-100 shadow-xl">
                <figure><img class="object-contain h-48 w-96" src="${news.image_url}" alt="Album"></figure>
                <div class="card-body">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details.slice(0, 200)}...</p>
                <div class="flex justify-between" >
                <div class="flex">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar mr-5">
                    <div class="w-10 rounded-full">
                    <img src="${news.author.img}" />
                    </div>
                </label>
                <div>
                <p class="font-medium text-gray-800">${news.author.name ? news.author.name : 'No data available'}</p>
                <p>${news.author.published_date}</p>
                </div>
                </div>
                <div class="flex text-center text-xl mt-2">
                <i class="fa-solid fa-eye mt-1"></i>
                <p class="ml-3">${news.total_view ? news.total_view : 'No data available'}</p>
                </div>
                <div class="flex mt-3">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </div>
                <div class="card-actions justify-end">
        
                <label onclick="openNewsDetail('${news._id}')" for="my-modal-5" class="btn btn-primary">Know More</label>
                </div>
                </div>
                </div>
                
            </div>

    `;
    newsContainer.appendChild(newsDiv);
    
    });
    
    // stop spinner or loader
    toggleSpinner(false);
}

const openNewsDetail = async (_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetail(data.data[0]);
}

const displayNewsDetail = news => {
    const title = document.getElementById('title');
    title.innerText=`${news.title}`;
    const fullDetails = document.getElementById('details');
    fullDetails.innerText= `${news.details}`;
    const info = document.getElementById('info');
    info.innerHTML=`
    <p class="font-medium text-gray-800">${news.author.name ? news.author.name : 'No data available'}</p>
    <p>${news.author.published_date}</p>
    `;
}

const toggleSpinner = isSpinning => {
    if(isSpinning){
        const spinner = document.getElementById('spinner');
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

const resultFound = async (category_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    displayResult(data.data);
    
}

const displayResult = category => {
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    result.innerHTML = `
    <p><strong>${category.length}</strong> items found for this category</p>
    `;
}
loadNews('01');
loadCategory();