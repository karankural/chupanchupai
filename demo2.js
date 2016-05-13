
var x = require('casper').selectXPath;
var mouse = require("mouse").create(casper);
var Json_objects = require('E:/WOrk/CasperJS programs/new/hcah/hcahdata.json');
var userid = Json_objects.Username;
var screenshots = Json_objects.Screenshots;		
var passkey = Json_objects.Password;
var url = Json_objects.Base_Url;


casper.test.begin('patient & package creation',0,function suite(test){
	
	casper.start(url,function(){
		console.log("STATEMENT-1 : Test Started");
		var expected_title = this.getTitle();
		this.test.assertTitle(expected_title,'ASSERTION-1 : Title Macted');
		var expected_Url = this.getCurrentUrl();
		this.test.assertUrlMatch(expected_Url,'ASSERTION-2 : URL Matched');
		this.capture(screenshots+'capture1.png');
		console.log('STATEMENT-2 : Now credentials is entering to login');

	});

	casper.then(function(){
		this.wait(3000,function(){
			this.sendKeys('#username',userid);
			this.sendKeys('#password',passkey);
			this.capture(screenshots+'credentials.png');
			console.log('STATEMENT-3 : credentials has been entered');
			this.click(x('//input[@class="btn btn-primary"]'));
			this.wait(5000,function(){
				this.capture(screenshots+'capture2.png');
			});
		});
	});
	casper.then(function(){
		var expected_Url=this.getCurrentUrl();
		this.test.assertUrlMatch(expected_Url,'ASSERTION-3 : Url Matched of current page');
		console.log('STATEMENT-4 : Now creating a new patient');
		this.click(x('//a[@href="/patients/new"]'));
			casper.wait(4000,function(){
				this.capture(screenshots+'capture3.png');
				});
		});
	casper.then(function(){
		var expected_Url = this.getCurrentUrl();
		this.test.assertUrlMatch(expected_Url,'ASSERTION-4 : Url Matched of current page')
		
		console.log('STATEMENT-5 : Now filling form to create patient');
		
		this.fill('form#new_patient_form',{
			'patient_form[backoffice]':'/backoffices/DEL',
			'patient_form[title]':'Mr',
			'patient_form[first_name]':'Santanu',
			'patient_form[middle_name]':'rai',
			'patient_form[surname]':'Sharma',
			'patient_form[gender]':'male',
			'patient_form[date_of_birth]':'12-12-1993',
			'patient_form[domestic]':'false',
			'patient_form[country]':'EG',
			'patient_form[passport_no]':'EG-111231223',
			'patient_form[mobile_no]':'+91-9999812027',
			'patient_form[email]':'abc@gmai.com',
			'patient_form[receive_email]':'0',
			'patient_form[blood_group]':'B+',
			'patient_form[source]':'Clinic',
			'patient_form[occupation]':'xyzz',
			'patient_form[organization]':'abcdef',
			'patient_form[designation]':'qwertytrewq',
			'patient_form[household_income_range]':'INR 10,00,001 - INR 25,00,000',
			'patient_form[marital_status]':'Single'
		});
		this.clickLabel('Auto immune');
		this.click(x('//input[@id="patient_form_chronic_disease_ulcerative_colitis"]'));

		this.fill('form#new_patient_form',{
			'patient_form[insurance_cover]':'true',
			'patient_form[home_address][address]': 'B-12',
			'patient_form[home_address][area]':'Chattarpur',
			'patient_form[home_address][city]':'Delhi',
			'patient_form[home_address][landmark]':'near metro station',
			'patient_form[home_address][pincode]':'110022',
			'patient_form[next_of_kin][name]':'Radha',
			'patient_form[next_of_kin][mobile_no]':'+91-8750944090',
			'next_of_kin_relation':'Sister'
		});
		this.wait(3000,function(){
			this.capture(screenshots+'capture4.png');
		});
		console.log('STATEMENT-6 : Now clicking create button to create patient');
		this.click(x('//input[@class="btn btn-primary"]'));
		
		this.wait(5000, function(){
			console.log('STATEMENT-7 : patient has been created');
			this.capture(screenshots+'capture5.png');
		});
	});
	casper.then(function(){
		console.log('STATEMENT-8 : Service package Panel');
		this.wait(3000,function(){
				this.mouse.click(x('//a[text()="Service Packages"]'));
		});
		this.wait(3000,function(){
			this.capture(screenshots+'capture6.png');
		});
		console.log('STATEMENT-9 : Now creating new service packages');
		this.wait(2000,function(){
			this.clickLabel('Create Service Package');
		});
	});
	casper.then(function(){
		console.log('STATEMENT-6 : Now filling form');
		this.wait(3000,function(){
		this.fill('form#new_service_package_form',{
			'service_package_form[medical_service]':'535deb9223638ddebb0065d8',
			'service_package_form[partner_uuid]':'ID-1022',
			'service_package_form[backoffice]':'/backoffices/DEL',
			'service_package_form[diagnosis]':'no',
			'service_package_form[frequency_as]':'end_of_service_package',
			});
		});
		console.log('STATEMENT-10 : service package form filled');
		this.wait(2000,function(){
			this.capture(screenshots+'capture7.png');
		});
		this.wait(2000,function(){
		this.click('#submit-service-package');
	});
		this.wait(4000,function(){
			this.capture(screenshots+'capture8.png');
		});
	});
});
casper.run();