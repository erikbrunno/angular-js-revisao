//cria o controller
angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, contatosAPI) {
    $scope.app = 'Lista Telefonica'
    $scope.contatos = [];
    $scope.operadoras = [];        

    var carregarContatos = function() {

        contatosAPI.getContatos()
            .then(function(response) {
                console.log('Contatos: ', response.data)
                $scope.contatos = response.data
            })
    }

   var carregarOperadoras = function() {
        $http.get("http://localhost:8080/angularjs/operadoras")
            .then(function(response) {
                console.log('Operadoras: ', response.data)
                $scope.operadoras = response.data;
            })
   }

    $scope.adicionarContato = function(contato) {
        contato.data = undefined
        
        console.log('Salvando contato: ', contato)
        contatosAPI.saveContato(contato)
            .then(function(data) {
                delete $scope.contato;
				$scope.contatoForm.$setPristine();
				carregarContatos();
            })

        //$scope.contatos.push(angular.copy(contato));
       // delete $scope.contato
        //Volta o contatoForm ao estado virgem
       // $scope.contatoForm.$setPristine()
    };
    
    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter(function(contato) {
            if (!contato.selecionado)
                return contato;
        })
    }
    $scope.isContatoSelecionado =  function(contatos) {
        return contatos.some(function(contato) {
            return contato.selecionado
        });
    }
    $scope.ordernarPor = function(campo) {
        $scope.criterioOrdenacao = campo
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao
    }

    carregarContatos();
    carregarOperadoras();

})