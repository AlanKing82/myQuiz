(function(){

 var app = angular.module('myQuiz', []);

	 app.controller('QuizController', ['$scope', '$http', '$sce', function($scope,$http,$sce){

	 	$scope.score = 0;
	 	$scope.activeQuestion = -1;
	 	$scope.activeQuestionAnswered = 0;
	 	$scope.percentage = 0;

	 	$http.get('quiz_data.json').then(function(quizData){
	 		
			$scope.myQuestions = quizData.data;
			$scope.totalQuestions = $scope.myQuestions.length;

	 	});

	 	$scope.selectAnswer = function(qIndex, aIndex){
	 		// alert(qIndex + ' ' + aIndex);
            var questionState = $scope.myQuestions[qIndex].questionState;
            
            if(questionState != 'answered'){
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                
                // correct ans from json file
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                
                // set on scope object
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
              
                if(correctAnswer === aIndex){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score +=1;
                }else{
                    $scope.myQuestions[qIndex].correctness = 'incorrect'; 
                }
                //questionState = 'answered';
                 $scope.myQuestions[qIndex].questionState = 'answered';
            }
            
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);

	 		
	 	}
        
        // check functions fired in html(selectedAnswer,correctAnswer props added after click)
        $scope.isSelected = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        
        $scope.isCorrect = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        
        $scope.selectContinue = function(){
            return $scope.activeQuestion +=1;
        }
        
        $scope.createShareLinks = function(percentage){
            var url = 'http://codifydesign.com';
            
            var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored '+percentage+'% on this quiz. Try to beat my score at '+url+'">Email a friend</a>';
            var twitterLink = '<a class="btn twitter" href="http://twitter.com/share?text=I scored '+percentage+'% on this quiz. Try to beat my score at&amp;hashtags=Quiz&amp;url='+url+'" target="_blank">Tweet your score</a>';
            var newMarkup = emailLink + twitterLink;
            
            return $sce.trustAsHtml(newMarkup);
        }


	 }]);

})();