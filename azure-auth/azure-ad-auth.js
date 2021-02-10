module.exports = function(RED) {
	const express = require("express");
	const app = express();
	function AzureAdAuth(n) {
		var node = this;
		RED.nodes.createNode(this, n);
		// Retrieve the config node
		//azure-ad config
		this.url= n.url;
		node.redirectUrl= n.redirectUrl;
		const configNode = RED.nodes.getNode(n.config);
		const pca = configNode.pca;
		node.clientId = configNode.clientId;
		node.clientSecret = configNode.clientSecret;

		// Create Express App and Routes
		const authCodeUrlParameters = {
			scopes: ["user.read"],
			redirectUri: node.redirectUrl
		};



		RED.httpNode.get(this.url, function(req, res){
			
			pca.getAuthCodeUrl(authCodeUrlParameters).then(function(response) {	
				var resp={};
				resp["clientId"] = node.clientId;
				resp["redirectUrl"] = node.redirectUrl;
				resp["clientSecret"] = node.clientSecret;
console.log(response);
				res.redirect(resp);
			});
			//pca.acquireToken
		});
	}

	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}
