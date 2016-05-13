var x = require('casper').selectXPath;
var mouse = require("mouse").create(casper);
var Json_objects = require('E:/WOrk/CasperJS programs/new/hcah/hcahdata.json');
var userid = Json_objects.Username;
var screenshots = Json_objects.Screenshots;		
var passkey = Json_objects.Password;
var url = Json_objects.Base_Url;
var webPage = require('webpage');
var page = webPage.create();



casper.test.begin('patient & package creation',0,function suite(test){
	
	casper.start(url,function(){
		console.log("STATEMENT-1 : Test Started");
		var expected_title = this.getTitle();
		this.test.assertTitle(expected_title,'ASSERTION-1 : Title Macted');
		var expected_Url = this.getCurrentUrl();
		this.test.assertUrlMatch(expected_Url,'ASSERTION-2 : URL Matched');
		//this.capture(screenshots+'Login_page.png');
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
			//	this.capture(screenshots+'homapage.png');
			});
		});
	});
	casper.then(function(){
		var expected_Url=this.getCurrentUrl();
		this.test.assertUrlMatch(expected_Url,'ASSERTION-3 : Url Matched of current page');
		this.click(x('//a[@href="/patients/10103259"]'));
		this.wait(3000,function(){
			//this.capture(screenshots+'pract1.png');
		});
		this.wait(3000,function(){
		this.mouse.click(x('//a[@href="/patients/10103259/service_packages"]'));
		});
		
	});
	casper.then(function(){
		
		this.wait(3000,function(){
			//	this.capture(screenshots+'pract2.png');
		});
		this.wait(2000,function(){
			this.click(x('//a[@href="/service_packages/CABG10006474"]'));
		});
		this.wait(3000,function(){
			//this.capture(screenshots+'pract4.png');
		});
		this.wait(2000,function(){
			this.clickLabel('Documents');
		});
		this.wait(3000,function(){
			this.capture(screenshots+'pract5.png');
		});
		this.wait(1000,function(){
			casper.page.uploadFile('input[name=medical_document]','E:/google.png');
		});
		this.wait(2000,function(){
			this.capture(screenshots+'pract6.png');
		});
	});


	/*casper.then(function(){
		this.fill('form#new_service_package_form',{
			'service_package_form[medical_service]':'5155b2a19821cc5b54000004',
			'service_package_form[partner_uuid]':'ID-10212',
			'service_package_form[backoffice]':'/backoffices/DEL',
			'service_package_form[diagnosis]':'No',
			'service_package_form[frequency_as]':'end_of_service_package',
			'service_package_form[surgery][details]':'Not Applied',
			'service_package_form[surgery][surgery_date]':'12-05-2016',
			'service_package_form[surgery][admit_date]':'08-05-2016',
			'service_package_form[surgery][discharge_date]':'15-05-2016'

		});
		this.wait(2000,function(){
			this.capture(screenshots+'pract5.png');
		});
		this.click('#submit-service-package');
		this.wait(4000,function(){
			this.capture(screenshots+'pract6.png');
		});
	});*/

});
casper.run();