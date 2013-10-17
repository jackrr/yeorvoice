var db = require('./db/db');

var userINFO = {
	name: {first: 'test', last: 'user', pseudo: 'phat'},
	email: 'testuser@test.com'
};

var topicINFO = {
	name: 'worst topic ever',
	description: 'many people used to say why oh why hey hey hey'
}

function begin(cb) {
	db.User.create(userINFO, function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
});

begin(function(err, user) {
	topicINFO.creatorID = user._id;
	topicINFO.creatorName = user.displayname;
	db.Topic.create(topicINFO, function(err, topic) {
		if (err) return cb(err);

	});
});

var words = ['add','advance','afraid','airplane','already','and','appear','apple','April','around','attempt','bad','bed','behind','beside','beyond','bird','blood','board','body','bread','broad','build','building','captain','child','childhood','children','cloud','cold','company','complete','condition','consider','considerable','could','crowd','cup','daily','dance','dare','dark','date','daughter','day','dead','deal','dear','December','decide','deep','degree','delight','demand','desire','destroy','device','did','die','difference','different','difficult','dig','dinner','direct','discover','dish','distance','distant','divide','do','doctor','does','dog','dollar','done','dont','door','double','end','escape','except','expect','experience','explain','feed','field','fine','food','forward','found','Friday','friend','garden','glad','God','gold','good','goodbye','group','happy','hard','head','heard','held','help','hope','hold','husband','idea','important','include','indeed','industry','inside','instead','jump','keep','kept','kind','ladder','lady','land','lead','leader','led','lord','loud','mad','made','measure','method','middle','mind','modern','Monday','mud','need','needle','old','open','opinion','order','orderly','outside','page','paid','pain','paint','pair','part','partial','party','pass','past','pay','peace','people','perfect','perhaps','period','person','picture','pick','piece','place','plain','plan','plant','play','pleasant','pleasure','please','point','poor','position','possible','pot','power','prepare','present','president','press','pretty','price','probably','problem','produce','promise','proud','prove','public','pull','pure','push','put','read','ready','record','red','reply','report','ridden','ride','road','round','sad','said','Saturday','second','seed','separate','September','shade','ship','shop','should','shoulder','side','sleep','slept','sold','sound','space','speak','special','spend','spent','spoke','spot','spread','spring','stand','step','stood','stop','student','study','succeed','sudden','Sunday','supply','suppose','surprise','third','thousand','today','told','toward','trade','trip','Tuesday','under','understand','understood','up','upon','usual','Wednesday','wide','wild','wind','window','wonder','wood','word','world','would','yard','yesterday'];