function validatePost(data) {
	let errors = [];
	if (!data.title) errors.push("titulo é obrigatorio");
	if (!data.content) erros.push("conteudo é obrigatorio");
	if (!data.author) errors.push("autor é obrigatorio");
	return errors;
}

module.exports = { validatePost }
