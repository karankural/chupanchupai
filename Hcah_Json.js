var x = require('casper').selectXPath;			// Instantiated the Xpath variable.
var mouse = require("mouse").create(casper);	// instantiate the mouse event.
var Json_objects = require('E:/WOrk/CasperJS programs/new/hcah/hcahdata.json'); // getting values from json

var userid = Json_objects.Username;
var screenshots = Json_objects.Screenshots;		
var passkey = Json_objects.Password;
var url = Json_objects.Base_Url;


	casper.test.begin("Suite -1 : Registering patient" ,0,function suite(test){		// suite consists of multiple test cases
		// fetch url, load the page and start test.
		casper.start(url, function(){
			console.log(" STATEMENT-1 : Test started");
			var title = this.getTitle();	
			this.test.assertTitle(title,"Assertion-1 : Title matched");	// matching title
			var expected_Url= this.getCurrentUrl();
			this.test.assertUrlMatch(expected_Url,"Assertion-2 : URL matched");	// matching URl
			this.capture(screenshots+'login.png');
		});
		// inserting username and password to login and check whether right page is loaded or not
		casper.then(function(){
			this.echo("STATEMENT-2 : Inserting Username and Password to login ");		
			this.sendKeys('#username',userid);
			this.sendKeys('#password',passkey);
			this.capture(screenshots+'login credentials.png');
			this.mouse.click(x('//input[@class="btn btn-primary"]'));
			this.wait(5000,function(){
				var expected_Url = this.getCurrentUrl();
				this.test.assertUrlMatch(expected_Url,'Assertion-3 : Home page URl matched');
			});
		});
		// Function to registering a new patient and check whether right page is loaded or nor.
		casper.then(function(){
			this.capture(screenshots+'homepage.png');
			console.log("STATEMENT-3 : Registering new patient");
			this.clickLabel('Register New Patient');
			this.wait(3000,function(){
				this.capture(screenshots+'registeration page.png');
				var expected_Url = this.getCurrentUrl();
				this.test.assertUrlMatch(expected_Url,'Assertion-4 : Registeration page URl matched ');
			});
		});
		// function to fill registration form
		casper.then(function(){
			console.log("STATEMENT-4 : Filling form");
			this.fill('form#new_patient_form',{
				'patient_form[backoffice]':'/backoffices/BNL',
				'patient_form[title]':'Miss',
				'patient_form[first_name]':'Srishti',
				'patient_form[middle_name]':'kaur',
				'patient_form[surname]':'Singh',
				'patient_form[gender]':'female',
				'patient_form[date_of_birth]':'03-05-2016',
				'patient_form[domestic]':'true',
				'patient_form[mobile_no]':'+91-9999812027',
				'patient_form[email]':'abc@gmail.com',
				'patient_form[blood_group]':'O-',
				'patient_form[source]':'Doctor',
				'patient_form[occupation]':'Business man',
				'patient_form[household_income_range]':'INR 5,00,001 - INR 10,00,000',
				'patient_form[marital_status]':'Married'
			});
			this.clickLabel('Auto immune');
			this.click(x('//input[@id="patient_form_chronic_disease_ulcerative_colitis"]'));
			this.wait(4000,function(){
				this.fill('form#new_patient_form',{
					'patient_form[home_address][address]':'B-122',
					'patient_form[home_address][area]':'Saket',
					'patient_form[home_address][pincode]':'110033',
					'patient_form[next_of_kin][name]':'Radha Sharma',
					'patient_form[next_of_kin][mobile_no]':'+91-8750944090',
					'next_of_kin_relation':'Others',
					'patient_form[next_of_kin][relationship]':'cousin'
				});
			});
			this.wait(5000,function(){
				console.log("STATEMENT-5 : Form Filled");
				this.capture(screenshots+'form.png');
			});
		});
		 Submitting form after filling the form.
		casper.then(function(){
			console.log("Clicking to create patient");
			console.log("STATEMENT-6 : Submitting Form");
			this.mouse.click(x('//input[@class="btn btn-primary"]'));
			this.wait(4000,function(){
				this.capture(screenshots+'Submit.png');
			});
			console.log('Patient is created');
		});
});
casper.run();
			
