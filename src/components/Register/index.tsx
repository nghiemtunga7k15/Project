import { ReportBuilder } from 'react-report-builder';
import { PeekdataApi } from 'peekdata-datagateway-api-sdk';
import * as Survey from "survey-react";
import * as SurveyPDF from "survey-pdf";
	
const Login = () => {
	
	
		var json = {
		    title: "Product Feedback Survey Example",
		    showProgressBar: "top",
		    pages: [
		      {
		        elements: [
		          {
		            type: "myquestion",
		            name: "cq1",
		            text: "Some Text"
		          },
		          {
		            type: "tagbox",
		            name: "position-tags",
		            title: "Choose job positions (Select2 Tagbox)...",
		            choices: [
		              "1|Designer",
		              "2|Front-end Developer",
		              "3|Back-end Developer",
		              "4|Database Administrator",
		              "5|System Engineer"
		            ]
		          },
		          {
		            type: "dropdown",
		            name: "position-s2",
		            title: "Choose job position (Select2)...",
		            renderAs: "select2",
		            choices: [
		              "1|Designer",
		              "2|Front-end Developer",
		              "3|Back-end Developer",
		              "4|Database Administrator",
		              "5|System Engineer"
		            ]
		          },
		          {
		            type: "radiogroup",
		            name: "position",
		            title: "Choose job position (iCheck)...",
		            isRequired: true,
		            colCount: 0,
		            choices: [
		              "1|Designer",
		              "2|Front-end Developer",
		              "3|Back-end Developer",
		              "4|Database Administrator",
		              "5|System Engineer"
		            ]
		          },
		          {
		            type: "radiogroup",
		            name: "position-pc",
		            title: "Choose job position (Pretty checkbox)...",
		            isRequired: true,
		            renderAs: "prettycheckbox",
		            colCount: 0,
		            choices: [
		              "1|Designer",
		              "2|Front-end Developer",
		              "3|Back-end Developer",
		              "4|Database Administrator",
		              "5|System Engineer"
		            ]
		          },
		          {
		            type: "barrating",
		            name: "barrating1",
		            ratingTheme: "css-stars",
		            title: "Please rate the movie you've just watched",
		            choices: ["1", "2", "3", "4", "5"]
		          }
		        ]
		      },
		      {
		        questions: [
		          {
		            type: "radiogroup",
		            name: "price to competitors",
		            title: "Compared to our competitors, do you feel the Product is",
		            choices: [
		              "Less expensive",
		              "Priced about the same",
		              "More expensive",
		              "Not sure"
		            ]
		          },
		          {
		            type: "radiogroup",
		            name: "price",
		            title: "Do you feel our current price is merited by our product?",
		            choices: [
		              "correct|Yes, the price is about right",
		              "low|No, the price is too low for your product",
		              "high|No, the price is too high for your product"
		            ]
		          },
		          {
		            type: "multipletext",
		            name: "pricelimit",
		            title: "What is the... ",
		            items: [
		              {
		                name: "mostamount",
		                title: "Most amount you would every pay for a product like ours"
		              },
		              {
		                name: "leastamount",
		                title: "The least amount you would feel comfortable paying"
		              }
		            ]
		          }
		        ]
		      },
		      {
		        questions: [
		          {
		            type: "text",
		            name: "email",
		            title:
		              'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.'
		          }
		        ]
		      }
		    ]
		};
	const survey = new Survey.Model(json);
	var options = {
	  fontSize: 14,
	  margins: {
	    left: 10,
	    right: 10,
	    top: 18,
	    bot: 10
	  }
	};
	//json is same as for SurveyJS Library
	var surveyPDF = new SurveyPDF.SurveyPDF(json, options);

	surveyPDF.onRenderHeader.add(function(_, canvas) {
	  canvas.drawText({
	    text:
	      "SurveyJS PDF | Please purchase a SurveyJS PDF developer license to use it in your app | https://surveyjs.io/Buy",
	    fontSize: 10
	  });
	});
	survey.onComplete.add(function (sender) {
		surveyPDF.save();
	});
  	return (
	    <div>
	  	 <Survey.Survey
                model={survey}
            />
	  	</div>
  	);
};
export default Login;