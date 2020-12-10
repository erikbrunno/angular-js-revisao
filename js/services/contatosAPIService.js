angular.module("listaTelefonica").factory("contatosAPI", function($http) {
    var _getContatos = function() {
        return $http.get("http://localhost:8080/angularjs/contatos")
    };
    
    var _saveContato = function(contato) {
        return $http.get("http://localhost:8080/angularjs/contatos", contato)
    }

    return {
        getContatos: _getContatos,
        saveContato: _saveContato
    }
})