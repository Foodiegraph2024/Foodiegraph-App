
// Google Cloud Vision API
	
        function analyzeImage() {
            var fileInput = document.getElementById('imageInput');
            var file = fileInput.files[0];
            
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageData = event.target.result;
                var base64Image = imageData.split(',')[1];
                
                var requestBody = {
                    "requests": [
                        {
                            "image": {
                                "content": base64Image
                            },
                            "features": [
                                {
                                    "type": "OBJECT_LOCALIZATION",
                                    "maxResults": 5,
                                    "model": "builtin/latest"
                                }
                            ]
                        }
                    ]
                };
                
                fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAtvlzEeqOMm5J4N6UgEDO2mjxGzgxzcAs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                })
                .then(response => response.json())
                .then(data => {
                    var resultsDiv = document.getElementById('results');
                    // resultsDiv.innerHTML = JSON.stringify(data, null, 2);
                    resultsDiv.innerHTML = data["responses"][0]["localizedObjectAnnotations"][0]["name"];
                    var food_name = data["responses"][0]["localizedObjectAnnotations"][0]["name"];
                    
                    // Call for the generate Recipe function
                    generateRecipe(food_name);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            };
            
            reader.readAsDataURL(file);
		}

// end Google Cloud Vision API

// read file function //這個是新加的程式，可能還有錯的地方

	function readFile(){
	
		fetch("apiKey.txt")
  			.then((res) => res.text())
  			.then((text) => {
    		// do something with "text"
    		return text;
   			})
  			.catch((e) => console.error(e));
	

	} 
// end read file function

// Open AI api
		
	function generateRecipe(food_name){
		 
		
//		const openaiApiKey = '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';
//		const openaiApiEndpoint = 'https://api.openai.com/v1/chat/completions';
//		const prompt = 'give me a recipe about orange';

		// Define the API key and endpoint

    //var food_name = document.getElementById("results").textContent;

		//var apiKey = document.getElementById("apiKey").files[0];
		
		var apiKey = readFile(); //這裡還不確定怎麼寫＊＊
		console.log(apiKey);

		const endpoint = 'https://api.openai.com/v1/chat/completions';
		
		// Set up the data for the API call
		const data = {
  		model: 'gpt-4', 
  		//prompt: 'give me more recommended recipes for the day and list out the ingredients', 
      messages: [
            {"role": "system", "content": "You are a helpful assistant for generating food recipes. Please write in markdown as simple as possible."},
            {"role": "user", "content": 'give me a recipe about ' + food_name + ' in 200 tokens.'}
      ],
  		temperature: 0.7,
  		max_tokens: 200,
		};

//    alert(JSON.stringify(data.messages, null, 2));

		// Make the API call using fetch
		fetch(endpoint, {
    		method: 'POST',
    		headers: {
      		'Content-Type': 'application/json',
      		'Authorization': `Bearer ${apiKey}`
    		},
    		body: JSON.stringify(data),
  		})
  		.then(response => response.json())
  		.then(data => {
    
      		const outputDiv = document.getElementById('output');
      		outputDiv.textContent = ((data.choices[0]["message"]["content"]).split("##"));
      		//outputDiv.textContent.replace(/\n/, "<br>");
      		console.log(outputDiv.textContent);
      		
      		//outputDiv.textContent = data.choices[0]["message"]["content"].split("##");		
      		//document.getElementById("output").innerHTML = outputDiv.textContent;
      		//console.log(outputDiv.textContent);
      		
/*      	outputDiv.textContent = (data.choices[0]["message"]["content"]).split("##");
      		let name = outputDiv.textContent[0];
      		let material = outputDiv.textContent[1];
      		let step = outputDiv.textContent[2];
      		console.log(name + "\n");
      		console.log(material + "\n");
      		console.log(step + "\n");   */
      		
  		})
  		.catch((error) => console.error('Error:', error));        
        
	}
 
// end Open ai api API