import { EventEmitter, Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class qrService {
	qrUpdated = new EventEmitter();
	scanSub: any;
	scanButton: any;
	qrText: string;	
	constructor(
		private qrScanner: QRScanner,
		private toastcontroller: ToastController,
		private alertCtrl: AlertController,

	) { }		

	async startScanning() {
		// console.log('startSanning Service')
		document.getElementById('qrCloseSpan').style.color="red";
		this.scanButton = document.getElementById('closeQR');
		this.scanButton.style.height = '50px'; // muestra en div "close"
		this.scanButton.style.zIndez = '1000'; // muestra en div "close"
		this.scanButton.style.color = 'white'; // muestra en div "close"
		// this.scanButton.addEventListener("touchstart", () => {
		// // this.scanButton.addEventListener("click", () => {
		// 	this.stopScanning()
		// });

		this.qrScanner.prepare().
			then((status: QRScannerStatus) => {
				console.log('entro a prepare')
				if (status.authorized) {
					this.qrScanner.show();
					this.scanSub = document.getElementById('bodyContent').style.opacity = '0';
					//   debugger
					this.scanSub = this.qrScanner.scan()
						.subscribe((textFound) => {
							console.log('texto found',textFound)
							this.stopScanning();

							// document.getElementById('bodyContent').style.opacity = '1';
							// this.qrScanner.hide();
							// this.scanSub.unsubscribe();
							
							this.qrText = textFound;
							if (textFound.length > 0) {
								
									this.qrUpdated.emit(this.qrText); // envia el texto al compoente
								setTimeout(() => {
									this.stopScanning()
								}, 100);
								
								// console.log('valor del qr',this.qrText)
								
								// this.createAttendance(this.qrText);
							}
							else {
								this.stopScanning();
								this.viewCodeError();
							}

						}, (err) => {
							alert(JSON.stringify(err));
						});

				} else if (status.denied) {
					console.log('acceso denegado');
				} else {
					console.log('error')
				}
			})
			.catch((e: any) => console.log('Error is', e));
	}

	async stopScanning() {
		this.qrText = '';
		this.scanSub.unsubscribe();
		document.getElementById('closeQR').style.color = 'transparent';
		document.getElementById('qrCloseSpan').style.color = 'transparent';
		document.getElementById('bodyContent').style.opacity = '1';
		document.getElementById('closeQR').style.height = '0';
		document.getElementById('closeQR').style.zIndex = '0';
		// console.log('stop')
		this.qrScanner.hide();
		
		console.log('stop complete')
	}
	async viewCodeError() {
		const alert = await this.alertCtrl.create({
			cssClass: 'alertOden',
			message: 'Código Qr invalido',
			buttons:[{
				text:'OK',
				cssClass:'btn-2'
			}]
		});
		await alert.present();
	}
}