<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();
	let fields = { contractName: '', title: '', author: '', synopsis: '', description: '' };
	let errors = { contractName: '', title: '', author: '', synopsis: '', description: '' };
	if (localStorage.getItem('PROPOSAL_FORM')) {
		const stringy = localStorage.getItem('PROPOSAL_FORM') || JSON.stringify(fields);
		fields = JSON.parse(stringy);
	}
	let valid = false;
	const saveContractName = () => {
		fields.contractName = fields.contractName.toLowerCase();
		fields.contractName = fields.contractName.replace(/\s/g, '-');
		localStorage.setItem('PROPOSAL_FORM', JSON.stringify(fields));
	};
	const saveDescription = () => {
		let desc = fields.description.replace(/\n/g, '');
		desc = desc.replace(/;; /g, '');
		const words = desc.split(' ');
		for (let i = 0; i < words.length; i++) {
			if (i === 0) {
				words[0] = '\n;; ' + words[0];
			} else if (i % 8 === 0) {
				words[i] = '\n;; ' + words[i];
			}
		}
		fields.description = words.join(' ');
		localStorage.setItem('PROPOSAL_FORM', JSON.stringify(fields));
	};
	const saveForm = () => {
		fields.title = fields.title.replace(/\\/g, '');
		fields.author = fields.author.replace(/\\/g, '');
		fields.synopsis = fields.synopsis.replace(/\\/g, '');
		localStorage.setItem('PROPOSAL_FORM', JSON.stringify(fields));
	};
	const submitHandler = () => {
		valid = true;
		if (fields.contractName.trim().length < 2) {
			errors.contractName = 'contract name is required - no spaces, dots, underscores or special characters';
			valid = false;
		} else {
			errors.contractName = '';
		}
		if (fields.title.trim().length < 5) {
			errors.title = 'title is required';
			valid = false;
		} else {
			errors.title = '';
		}
		if (fields.author.trim().length < 1) {
			errors.author = 'author is required';
			valid = false;
		} else {
			errors.author = '';
		}
		if (fields.synopsis.trim().length < 1) {
			errors.synopsis = 'synopsis is required';
			valid = false;
		} else {
			errors.synopsis = '';
		}
		if (fields.description.trim().length < 1) {
			errors.description = 'Description is required';
			valid = false;
		} else {
			errors.description = '';
		}
		// add ew poll if valid
		if (valid) {
			saveDescription();
			saveForm();
			dispatch('addNewPoll', fields);
		}
	};
	console.log('title=' + fields.title);
	console.log('PROPOSAL_FORM=' + localStorage.getItem('PROPOSAL_FORM'));
</script>

<div class=" mx-10 mb-4">
	<p>Enter the information required then press 'update' - the information will be copied into the contract template. Press deploy to deploy the contract on the Stacks Blockchain.</p>
	<form on:submit|preventDefault={submitHandler}>
		<div class="form-field">
			<label for="contractName">Contract Name (max 60 chars)</label>
			<input class={'rounded-lg border-gray-300  px-2 py-1 text-black'} maxlength="60" type="text" id="title" bind:value={fields.contractName} on:input={saveContractName} />
			<div class="error">{errors.contractName}</div>
		</div>
		<div class="form-field">
			<label for="title">Title (max 60 chars)</label>
			<input class={'rounded-lg border-gray-300  px-2 py-1 text-black'} maxlength="60" type="text" id="title" bind:value={fields.title} on:input={saveForm} />
			<div class="error">{errors.title}</div>
		</div>
		<div class="form-field">
			<label for="author">Author (max 60 chars)</label>
			<input class={'rounded-lg border-gray-300  px-2 py-1 text-black'} maxlength="60" type="text" id="author" bind:value={fields.author} on:input={saveForm} />
			<div class="error">{errors.author}</div>
		</div>
		<div class="form-field">
			<label for="synopsis">Synopsis (max 100 chars)</label>
			<input class={'rounded-lg border-gray-300  px-2 py-1 text-black'} maxlength="100" type="text" id="synopsis" bind:value={fields.synopsis} on:input={saveForm} />
			<div class="error">{errors.synopsis}</div>
		</div>
		<div class="form-field">
			<label for="description">Description (max 500 chars)</label>
			<textarea class={'rounded-lg border-gray-300  px-2 py-1 text-black'} maxlength="500" rows="3" id="description" bind:value={fields.description} on:input={saveForm}></textarea>
			<div class="error">{errors.description}</div>
		</div>
		<div class="mt-4">
			<button
				class="hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-800 border-primary-600 focus-visible:outline-primary-500/50 inline-flex w-full items-center justify-center gap-x-1.5 rounded-xl border bg-primary-01 px-4 py-2 text-center text-base text-black focus:outline-none focus:ring-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>Update</button
			>
		</div>
	</form>
</div>

<style>
	form {
		width: 100%;
		margin: 0 auto;
		text-align: left;
	}
	.form-field {
		margin: 10px auto;
	}
	textarea {
		width: 100%;
	}
	input {
		width: 100%;
	}
	label {
		vertical-align: top;
		width: 100%;
		margin: 5px auto;
		text-align: left;
	}
	.error {
		text-align: right;
		font-weight: bold;
		font-size: 12px;
		color: #d91b42;
	}
</style>
