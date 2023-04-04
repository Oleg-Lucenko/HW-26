
const getPostObj = {

    inputInsert: document.querySelector('.post-id'),
    container: document.querySelector('.container'),

    submitListener() {
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        let enteredId = this.inputInsert.value;
        const link = `https://jsonplaceholder.typicode.com/todos/${enteredId}`;
        this.post(link, enteredId);
    });
    },

    processingRequest(url) {
        let request = fetch(url)
        .then(data => {

            return new Promise((resolve, reject) => {
                if (data.ok) {
                resolve(data);
                } else {
                    reject(new Error(`wrong URL (status ${data.status})`));
                };
            });
        });
        return request;
    },


    async post(url, inputValue) {
        try {
        let resultRequest = await this.processingRequest(url);

        let regExp = new RegExp('^([1-9]|[1-9][0-9]|100)$');
        let test = regExp.test(inputValue);

        if (test) {
        resultRequest = await resultRequest.json();
        let postObj = await resultRequest;
            this.container.innerHTML = `<p>User ID: ${postObj.userId}</p>
        <p>Title: ${postObj.title}</p>
        <p>ID: ${postObj.id}</p>
        <p>Completed: ${postObj.completed}</p>`;
        } else if (inputValue.trim() === '') {
                throw new Error('ID not entered');
        } else {
                throw new Error('entered ID does not match the range from 1 till 100');
        };
    } catch (error) {
        alert(error);
    };
    }
};


getPostObj.submitListener();

