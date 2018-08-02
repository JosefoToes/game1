var ganadores = 0

var numeroe = 0;
var preguntactiva = '';
var timeleft = 0;
var downloadTimer
var este = ''

var datavalorazul = 0
var datavalorrojo = 0
var datavaloramarillo = 0
var datavalorverde = 0

var scorenumazul = 0
var scorenumrojo = 0
var scorenumamarillo = 0
var scorenumverde = 0

var turno = 'rojo';

var ganarojo = 0;
var ganaazul = 0;
var ganaamarillo = 0;
var ganaverde = 0;

var colore = ''

function obtienepregunta(){
	numeroe = Math.floor(Math.random() * 40); 
	preguntactiva = 'pregunta' + numeroe
};
function contar(){
	timeleft = 45;
	downloadTimer = setInterval(function(){
	$('#countdowntimer').html(timeleft);
	timeleft--;
	if(timeleft <= -1){
		clearInterval(downloadTimer);
		$('.preguntas').fadeOut('fast');
		$('#eltimer').fadeOut('fast');
		$('#tarjetas').fadeOut('fast');
		$('#blockeo').fadeOut('fast');
		}
	},1000);
}
function nocontar(){
	$('#tarjetas').fadeOut('fast');
	timeleft = '';
	$('#countdowntimer').html('');

}
function desbloqueacolor(colore){
	var colore = colore
	$('#blockeorojo, #blockeoazul, #blockeoverde').show();
	$('#blockeo' + colore + '').hide();
	turno = colore;
	$('#tocaturnocolor').html(colore);
}
function cambiaturnoRojo(){
	if(ganaazul == 1){
		desbloqueacolor('verde');
	}else{
		desbloqueacolor('azul');
	
}}
function cambiaturnoAzul(){
	if(ganaverde == 1){
		desbloqueacolor('rojo');
	}else{
		desbloqueacolor('verde');
	}
}
function cambiaturnoVerde(){
	if(ganarojo == 1){
		desbloqueacolor('azul');
	}else{
		desbloqueacolor('rojo');
	}
}
function findejuegorojo(){
	$('#scorerojo').html('$1,000,000');
	$('.mrj').addClass('yafue').off();
	ganadores++ ;
	ganarojo = 1;
	cambiaturnoRojo();
}
function findejuegoazul(){
	$('#scoreazul').html('$1,000,000');
	$('.maz').addClass('yafue').off();
	ganadores++ ;
	ganaazul = 1;
	cambiaturnoAzul();
	desbloqueacolor('verde');	
}
function findejuegoverde(){
	$('#scoreverde').html('$1,000,000');
	$('.mvd').addClass('yafue').off();
	ganadores++ ;
	ganaverde = 1;
	cambiaturnoVerde();
	desbloqueacolor('rojo');
}
function correcta(){
	$('#feedbackbuena').fadeIn('slow');
	setTimeout(function(){
		$('#feedbackbuena').fadeOut('slow');
	},3000);
	setTimeout(function(){
		$('#eltimer').fadeOut('fast');
		$('#blockeo').fadeOut('slow');
		$('.preguntas').fadeOut('slow');
		nocontar();
	},3000);
}
function incorrecta(){
	$('#feedbackmala').fadeIn('slow');
	setTimeout(function(){
		$('#feedbackmala').fadeOut('slow');
	},3000);
	setTimeout(function(){
		$('#eltimer').fadeOut('fast');
		$('#blockeo').fadeOut('slow');
		$('.preguntas').fadeOut('slow');
		nocontar();
	},3000);
}

$(document).ready(function(){
	cambiaturnoVerde();
	desbloqueacolor('rojo');
	const numberWithCommas = (x) => {
	  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	$('#aceptar1').click(function(){
		$('#inicio1').fadeOut('fast');
	});
	$('#tarjetas').click(function(){
		$('.card1').transition({
			rotate3d:'0,0,0,0deg',
			opacity:'0'
		},500);
		$('.card2').transition({
			rotate3d:'0,0,0,0deg',
			opacity:'0'
		},600);
		$('.card3').transition({
			rotate3d:'0,0,0,0deg',
			opacity:'0'
		},700);
		$('.card4').transition({
			rotate3d:'0,0,0,0deg',
			opacity:'0'
		},800);		
		setTimeout(function(){
			$('#tarjetas').fadeOut();
			$('.card1').css('transform','rotate3d(100,70,70,280deg) translate3d(0px,50px,230px)').css('opacity','1');
			$('.card2').css('transform','rotate3d(100,70,70,280deg) translate3d(0px,50px,230px)').css('opacity','1');
			$('.card3').css('transform','rotate3d(100,70,70,280deg) translate3d(0px,50px,230px)').css('opacity','1');
			$('.card4').css('transform','rotate3d(100,70,70,280deg) translate3d(0px,50px,230px)').css('opacity','1');
			$('#blockeo').show();
			obtienepregunta();
			$('#'+preguntactiva).fadeIn('slow');
			$('#eltimer').fadeIn('slow');
			contar();
		},200)
	});
	$('.cerrar').click(function(){
		$('#blockeo').hide();
		$('.preguntas').fadeOut('fast');
		$('#eltimer').fadeOut('fast');
		nocontar();
	});
	$('.correcta').click(function(){
		
		$('#bienaudio')[0].play();
		if(turno == 'rojo' & scorenumrojo >= 1000000){
			ganarojo = 1;
			findejuegorojo();
		}else if(turno == 'rojo' & scorenumrojo <= 1000000){	
			$('#scorerojo').html('$' + numberWithCommas(scorenumrojo));
			cambiaturnoRojo();
		}else if(turno == 'azul' & scorenumazul >= 1000000){
			ganaazul = 1;
			findejuegoazul();
		}else if(turno == 'azul' & scorenumazul <= 1000000){
			$('#scoreazul').html('$' + numberWithCommas(scorenumazul));
			cambiaturnoAzul();
		}else if(turno == 'verde' & scorenumverde >= 1000000){
			ganaverde = 1;
			findejuegoverde();
		}else if(turno == 'verde' & scorenumverde <= 1000000){	
			$('#scoreverde').html('$' + numberWithCommas(scorenumverde));
			cambiaturnoVerde();
		}else if(turno == 'rojo'){
			turno = 'azul';
			cambiaturnoRojo();
		}else if(turno == 'azul'){
			turno = 'verde';
			cambiaturnoAzul();
		}else if(turno == 'verde'){
			turno = 'rojo';
			cambiaturnoVerde();
		};
		correcta();
	});
	$('.incorrecta').click(function(){
		$('#malaudio')[0].play();
		if(turno == 'rojo'){
			turno = 'azul';
			$('#scorerojo').html('$0');
			scorenumrojo = 0;
			datavalorrojo = 0;
			cambiaturnoRojo();
		}else if(turno == 'azul'){
			turno = 'verde';
			$('#scoreazul').html('$0');
			scorenumazul = 0;
			datavalorazul = 0;
			cambiaturnoAzul();
		}else if(turno == 'verde'){
			turno = 'rojo';
			$('#scoreverde').html('$0');
			scorenumverde = 0;
			datavalorverde = 0;
			cambiaturnoVerde();
		} 
		incorrecta();
	});
	$('#question').click(function(){
		$('#textinst').toggle();
	});
	$('#opc2').click(function(){
		window.location = 'opc2.html';
	});
	$('#opc3').click(function(){
		window.location = 'opc3.html';
	});
	$('#opc4').click(function(){
		window.location = 'opc4.html';
	});
	$('.mrj').click(function(){
		datavalorrojo = this.getAttribute('data-val-type');
		scorenumrojo = parseInt(scorenumrojo , 10) + parseInt(datavalorrojo , 10);
		turno = 'rojo';
		colore = 'rojo';
	});
	$('.maz').click(function(){
		datavalorazul = this.getAttribute('data-val-type');
		scorenumazul = parseInt(scorenumazul , 10) + parseInt(datavalorazul , 10);
		turno = 'azul';
		colore = 'azul';
	});
	$('.mvd').click(function(){
		datavalorverde = this.getAttribute('data-val-type');
		scorenumverde = parseInt(scorenumverde , 10) + parseInt(datavalorverde , 10);
		turno = 'verde';
		colore = 'verde';
	});
	$('.marcador').click(function(){
		$('#tarjetas').fadeIn('fast');
		este = this.id
		this.style.opacity = 0.2;
		this.style.userSelect = 'none';
		this.style.cursor = 'default';
	});
});