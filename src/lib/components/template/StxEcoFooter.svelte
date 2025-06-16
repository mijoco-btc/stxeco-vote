<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import LogoStacks from '$lib/assets/LogoStacks.svelte';

	console.log('Parent component context:');

	onMount(() => {
		console.log('Component mounted');
	});

	onDestroy(() => {
		console.log('Component destroyed');
	});
</script>

<div class="mx-auto px-6">
	<div class="relative mx-auto mt-32 max-w-7xl py-6 md:px-6">
		<div class="absolute left-0 top-[-72px] md:left-6">
			<svg width="252" height="96" viewBox="0 0 252 96" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 0H228C234.627 0 240 5.37258 240 12V84C240 90.6274 245.373 96 252 96H0V12C0 5.37258 5.37258 0 12 0Z" fill="#F4F3F0" />
			</svg>

			<a href="https://www.stacks.co/" class="focus-visible:outline-primary-500/50 absolute left-[calc(50%-6px)] top-8 -translate-x-1/2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
				<LogoStacks class="h-auto w-28" />
			</a>
		</div>
		<div class="relative w-full overflow-hidden rounded-3xl rounded-tl-none bg-[#F4F3F0] px-10 py-10">
			<div class="relative z-[1] space-y-6 py-16">
				<p class="text-lg text-[#131416]/[0.64]">Explore the Stacks:</p>

				<div class="gap-x-10 space-y-4 sm:flex sm:space-y-0">
					<a
						href="https://www.stacks.co/ecosystem"
						class="focus-visible:outline-black-500/50 inline-flex shrink-0 items-center rounded-lg border border-transparent bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Ecosystem&nbsp;<span class="text-[#FDFDFC]/[0.64]">-&gt;</span>
					</a>
					<a
						href="https://github.com/radicleart/stxeco-vote"
						class="focus-visible:outline-black-500/50 inline-flex shrink-0 items-center rounded-lg border border-transparent bg-[#EEEBE7] px-4 py-2 font-mono text-sm uppercase text-[#27282B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Github&nbsp;<span class="text-[#27282B]">-&gt;</span>
					</a>
				</div>
			</div>

			<svg class="absolute -right-[3em] bottom-0 z-0" xmlns="http://www.w3.org/2000/svg" width="1104" height="396" fill="none">
				<g clip-path="url(#clip0_180_5235)">
					<g filter="url(#filter0_ii_180_5235)">
						<path fill="#F4F3F0" d="M796 161c0-13.255 10.745-24 24-24h212.27c13.26 0 24 10.745 24 24v228.261c0 13.255-10.74 24-24 24H820c-13.255 0-24-10.745-24-24V161Z" />
					</g>
					<g filter="url(#filter1_ii_180_5235)">
						<g clip-path="url(#clip1_180_5235)">
							<rect width="231" height="231" x="857" y="198" fill="#F4F3F0" rx="12" />
							<mask id="mask0_180_5235" width="231" height="231" x="857" y="198" maskUnits="userSpaceOnUse" style="mask-type:luminance">
								<rect width="231" height="231" x="857" y="198" fill="url(#paint0_linear_180_5235)" rx=".01" />
							</mask>
							<g mask="url(#mask0_180_5235)">
								<path fill="#F4F3F0" d="M857 198h231v231H857z" />
							</g>
						</g>
					</g>
					<g filter="url(#filter2_ii_180_5235)">
						<g clip-path="url(#clip2_180_5235)">
							<rect width="231" height="231" x="918" y="259" fill="#F4F3F0" rx="8" />
							<mask id="mask1_180_5235" width="231" height="231" x="918" y="259" maskUnits="userSpaceOnUse" style="mask-type:luminance">
								<rect width="231" height="231" x="918" y="259" fill="url(#paint1_linear_180_5235)" rx=".01" />
							</mask>
							<g mask="url(#mask1_180_5235)">
								<path fill="#F4F3F0" d="M918 259h231v231H918z" />
							</g>
						</g>
					</g>
					<g filter="url(#filter3_b_180_5235)">
						<g filter="url(#filter4_ii_180_5235)">
							<g clip-path="url(#clip3_180_5235)">
								<rect width="96" height="96" fill="#E2DFDA" rx="47.4999" transform="matrix(1 0 0 -1 916 353)" />
								<mask id="mask2_180_5235" width="96" height="96" x="916" y="257" maskUnits="userSpaceOnUse" style="mask-type:luminance">
									<rect width="96" height="96" fill="url(#paint2_linear_180_5235)" rx=".0065972" transform="matrix(1 0 0 -1 916 353)" />
								</mask>
								<g mask="url(#mask2_180_5235)">
									<circle cx="964" cy="305" r="48" fill="#D9D9D9" />
								</g>
							</g>
						</g>
						<g filter="url(#filter5_ii_180_5235)">
							<mask id="mask3_180_5235" width="72" height="72" x="944" y="285" maskUnits="userSpaceOnUse" style="mask-type:luminance">
								<rect width="71.8889" height="71.8889" fill="url(#paint3_linear_180_5235)" rx=".0065972" transform="matrix(1 0 0 -1 944 357)" />
							</mask>
							<g mask="url(#mask3_180_5235)">
								<circle cx="979.945" cy="320.945" r="35.945" fill="#D9D9D9" />
							</g>
						</g>
						<g filter="url(#filter6_ii_180_5235)">
							<mask id="mask4_180_5235" width="48" height="49" x="956" y="297" maskUnits="userSpaceOnUse" style="mask-type:luminance">
								<rect width="47.7778" height="47.7778" fill="url(#paint4_linear_180_5235)" rx=".0065972" transform="matrix(1 0 0 -1 956 345)" />
							</mask>
							<g mask="url(#mask4_180_5235)">
								<circle cx="979.89" cy="320.89" r="23.89" fill="#D9D9D9" />
							</g>
						</g>
						<path
							fill="#fff"
							d="M986.874 322.434c-.074-.043-.037-.148.049-.142 2.283.265 3.489-2.142 3.834-3.28 1.335-4.425-3.2-6.376-4.665-6.881-.246-.086-.375-.35-.302-.597l1.071-3.551c.08-.258-.067-.529-.326-.609l-.978-.295c-.259-.08-.53.067-.61.326l-1.071 3.545c-.08.258-.35.4-.609.326l-2.314-.695c-.258-.08-.4-.351-.326-.61l1.071-3.545c.08-.258-.068-.529-.326-.609l-.979-.295c-.258-.08-.529.067-.609.326l-1.071 3.545c-.08.258-.351.4-.609.326l-1.157-.351-3.243-.978c-.259-.08-.53.067-.61.326l-.344 1.145c-.08.258.067.529.326.609l2.591.781c.258.08.4.351.326.61l-4.382 14.542c-.08.259-.351.4-.609.326l-2.247-.677c-.221-.067-.461.031-.572.24l-.628 1.2c-.141.271 0 .604.29.69l4.301 1.298c.259.08.401.351.327.61l-1.151 3.815c-.08.259.068.529.326.609l.979.296c.258.08.529-.068.609-.326l1.151-3.816c.08-.258.35-.4.609-.326l2.154.646c.258.08.4.351.326.609l-1.151 3.816c-.08.258.068.529.326.609l.979.296c.258.08.529-.068.609-.327l1.145-3.803c.08-.264.357-.406.615-.32 1.859.609 6.838 2.123 9.189-2.468 2.074-4.049-.997-6.252-2.314-6.966Zm-7.053-9.195c.074-.24.32-.388.566-.338 7.631 1.575 5.963 5.305 5.963 5.305-1.163 3.852-6.455 1.821-7.938 1.163-.222-.099-.339-.351-.265-.585l1.674-5.545Zm5.139 13.958c-1.182 3.92-7.576 1.656-9.263.985-.233-.093-.356-.351-.283-.591l1.804-5.988c.073-.24.32-.388.566-.339 9.047 1.828 7.176 5.933 7.176 5.933Z"
						/>
					</g>
				</g>
				<g clip-path="url(#clip4_180_5235)" opacity=".04" style="mix-blend-mode:exclusion">
					<mask id="mask5_180_5235" width="2594" height="1589" x="-48" y="-9" maskUnits="userSpaceOnUse" style="mask-type:luminance">
						<path stroke="#fff" d="M48.5-8v773M144.5-8v773M240.5-8v773M336.5-8v773M432.5-8v773M528.5-8v773M624.5-8v773M720.5-8v773M816.5-8v773M912.5-8v773M1008.5-8v773M-48 87.5h1296M-48 183.5h1296M-48 279.5h1296M-48 375.5h1296" />
					</mask>
					<g mask="url(#mask5_180_5235)">
						<mask id="mask6_180_5235" width="964" height="964" x="308" y="-159" maskUnits="userSpaceOnUse" style="mask-type:luminance">
							<rect width="964" height="964" x="308" y="-159" fill="url(#paint5_radial_180_5235)" rx=".01" />
						</mask>
						<g mask="url(#mask6_180_5235)">
							<path fill="#E2DFDA" d="M0 51c0-6.6274 5.37258-12 12-12h1080c6.63 0 12 5.3726 12 12v505c0 6.627-5.37 12-12 12H12c-6.62742 0-12-5.373-12-12V51Z" />
						</g>
					</g>
				</g>
				<defs>
					<filter id="filter0_ii_180_5235" width="260.273" height="278.261" x="796" y="137" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
						<feBlend in2="shape" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation=".5" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<filter id="filter1_ii_180_5235" width="231" height="233" x="857" y="198" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
						<feBlend in2="shape" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation=".5" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<filter id="filter2_ii_180_5235" width="231" height="233" x="918" y="259" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
						<feBlend in2="shape" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation=".5" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<filter id="filter3_b_180_5235" width="163.333" height="163.333" x="884.333" y="225.333" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="15.8333" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_180_5235" />
						<feBlend in="SourceGraphic" in2="effect1_backgroundBlur_180_5235" result="shape" />
					</filter>
					<filter id="filter4_ii_180_5235" width="96" height="98" x="916" y="257" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
						<feBlend in2="shape" mode="overlay" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<filter id="filter5_ii_180_5235" width="72" height="74" x="944" y="285" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
						<feBlend in2="shape" mode="overlay" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<filter id="filter6_ii_180_5235" width="48" height="50" x="956" y="297" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="16" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
						<feBlend in2="shape" mode="overlay" result="effect1_innerShadow_180_5235" />
						<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
						<feOffset />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
						<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
						<feBlend in2="effect1_innerShadow_180_5235" result="effect2_innerShadow_180_5235" />
					</filter>
					<linearGradient id="paint0_linear_180_5235" x1="972.5" x2="972.5" y1="198" y2="429" gradientUnits="userSpaceOnUse">
						<stop stop-color="#fff" />
						<stop offset="1" />
					</linearGradient>
					<linearGradient id="paint1_linear_180_5235" x1="1033.5" x2="1033.5" y1="259" y2="490" gradientUnits="userSpaceOnUse">
						<stop stop-color="#fff" />
						<stop offset="1" />
					</linearGradient>
					<linearGradient id="paint2_linear_180_5235" x1="48" x2="48" y1="0" y2="96" gradientUnits="userSpaceOnUse">
						<stop offset=".166667" stop-color="#D6D6D6" />
						<stop offset=".229086" stop-color="#D5D5D5" />
						<stop offset=".283802" stop-color="#D1D1D1" />
						<stop offset=".332" stop-color="#CBCBCB" />
						<stop offset=".374864" stop-color="#C3C3C3" />
						<stop offset=".41358" stop-color="#B9B9B9" />
						<stop offset=".449333" stop-color="#AEAEAE" />
						<stop offset=".483309" stop-color="#A1A1A1" />
						<stop offset=".516691" stop-color="#929292" />
						<stop offset=".550667" stop-color="#838383" />
						<stop offset=".58642" stop-color="#727272" />
						<stop offset=".625136" stop-color="#606060" />
						<stop offset=".668" stop-color="#4E4E4E" />
						<stop offset=".716197" stop-color="#3B3B3B" />
						<stop offset=".770914" stop-color="#282828" />
						<stop offset=".833333" stop-color="#151515" />
					</linearGradient>
					<linearGradient id="paint3_linear_180_5235" x1="35.9444" x2="35.9444" y1="0" y2="71.8889" gradientUnits="userSpaceOnUse">
						<stop offset=".166667" stop-color="#D6D6D6" />
						<stop offset=".229086" stop-color="#D5D5D5" />
						<stop offset=".283802" stop-color="#D1D1D1" />
						<stop offset=".332" stop-color="#CBCBCB" />
						<stop offset=".374864" stop-color="#C3C3C3" />
						<stop offset=".41358" stop-color="#B9B9B9" />
						<stop offset=".449333" stop-color="#AEAEAE" />
						<stop offset=".483309" stop-color="#A1A1A1" />
						<stop offset=".516691" stop-color="#929292" />
						<stop offset=".550667" stop-color="#838383" />
						<stop offset=".58642" stop-color="#727272" />
						<stop offset=".625136" stop-color="#606060" />
						<stop offset=".668" stop-color="#4E4E4E" />
						<stop offset=".716197" stop-color="#3B3B3B" />
						<stop offset=".770914" stop-color="#282828" />
						<stop offset=".833333" stop-color="#151515" />
					</linearGradient>
					<linearGradient id="paint4_linear_180_5235" x1="23.8889" x2="23.8889" y1="0" y2="47.7778" gradientUnits="userSpaceOnUse">
						<stop offset=".166667" stop-color="#D6D6D6" />
						<stop offset=".229086" stop-color="#D5D5D5" />
						<stop offset=".283802" stop-color="#D1D1D1" />
						<stop offset=".332" stop-color="#CBCBCB" />
						<stop offset=".374864" stop-color="#C3C3C3" />
						<stop offset=".41358" stop-color="#B9B9B9" />
						<stop offset=".449333" stop-color="#AEAEAE" />
						<stop offset=".483309" stop-color="#A1A1A1" />
						<stop offset=".516691" stop-color="#929292" />
						<stop offset=".550667" stop-color="#838383" />
						<stop offset=".58642" stop-color="#727272" />
						<stop offset=".625136" stop-color="#606060" />
						<stop offset=".668" stop-color="#4E4E4E" />
						<stop offset=".716197" stop-color="#3B3B3B" />
						<stop offset=".770914" stop-color="#282828" />
						<stop offset=".833333" stop-color="#151515" />
					</linearGradient>
					<clipPath id="clip0_180_5235">
						<path fill="#fff" d="M670-12h384v408H670z" />
					</clipPath>
					<clipPath id="clip1_180_5235">
						<rect width="231" height="231" x="857" y="198" fill="#fff" rx="12" />
					</clipPath>
					<clipPath id="clip2_180_5235">
						<rect width="231" height="231" x="918" y="259" fill="#fff" rx="8" />
					</clipPath>
					<clipPath id="clip3_180_5235">
						<rect width="96" height="96" fill="#fff" rx="47.4999" transform="matrix(1 0 0 -1 916 353)" />
					</clipPath>
					<clipPath id="clip4_180_5235">
						<path fill="#fff" d="M0 40h1104v355H0z" />
					</clipPath>
					<radialGradient id="paint5_radial_180_5235" cx="0" cy="0" r="1" gradientTransform="matrix(0 482 -482 0 790 323)" gradientUnits="userSpaceOnUse">
						<stop offset=".0885417" stop-color="#fff" />
						<stop offset=".159177" stop-color="#FEFEFE" />
						<stop offset=".221106" stop-color="#FAFAFA" />
						<stop offset=".275806" stop-color="#F3F3F3" />
						<stop offset=".324755" stop-color="#EAEAEA" />
						<stop offset=".369431" stop-color="#E0E0E0" />
						<stop offset=".411312" stop-color="#D3D3D3" />
						<stop offset=".451874" stop-color="#C4C4C4" />
						<stop offset=".492597" stop-color="#B3B3B3" />
						<stop offset=".534957" stop-color="#A1A1A1" />
						<stop offset=".580431" stop-color="#8E8E8E" />
						<stop offset=".630499" stop-color="#797979" />
						<stop offset=".686637" stop-color="#646464" />
						<stop offset=".750323" stop-color="#4D4D4D" />
						<stop offset=".823035" stop-color="#363636" />
						<stop offset=".90625" stop-color="#1E1E1E" />
						<stop offset="1" />
					</radialGradient>
				</defs>
			</svg>
		</div>
	</div>
</div>
