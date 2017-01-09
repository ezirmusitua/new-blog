import { Component } from '@angular/core';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  articleList = [{
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2'],
    description: 'hello world'
  }, {
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2'],
    description: 'hello world'
  }];
  article = {
    title: 'hello world ~ 1',
    tags: ['h1', 'h2'],
    description: 'hello world',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse neque urna, imperdiet id egestas non, congue at tortor. Quisque et purus eu orci placerat tincidunt eu sed lectus. Morbi ultricies mi at justo aliquet, vitae sollicitudin orci pellentesque. Proin auctor lectus metus, eu maximus neque ullamcorper sit amet. Pellentesque accumsan iaculis libero, quis condimentum est pulvinar at. In aliquam ipsum lectus, nec tincidunt metus tincidunt quis. Suspendisse semper massa vel est tempor, vel volutpat sapien hendrerit. Donec faucibus cursus diam, sit amet semper felis pulvinar non. In et est lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque pellentesque felis orci, eu lobortis lectus pharetra at. Nulla nec ligula quis dui accumsan aliquam. Phasellus in libero sit amet enim pharetra scelerisque sed quis lorem. Nullam eget orci a eros tincidunt bibendum vitae a odio.

Praesent nec sagittis nunc. Pellentesque ultricies mi diam, in faucibus arcu pellentesque eu. Donec placerat sollicitudin eros feugiat pretium. Nunc sit amet laoreet mauris. Aliquam quis mi ut massa aliquet aliquam at ac nisl. Nulla semper lorem non euismod eleifend. Nunc luctus orci ut porta tristique. Praesent condimentum tempor elit, et congue metus semper eu. Pellentesque eleifend urna sit amet pharetra fermentum. Curabitur dui mi, pulvinar at blandit non, pretium ac dui. Cras nec condimentum diam. Vestibulum nec ipsum congue, semper quam quis, iaculis odio.

Etiam eget mollis justo, non bibendum tortor. Mauris quis eros a mauris tempus efficitur nec sit amet erat. Quisque blandit mi mauris, in porta tortor fringilla at. Curabitur non nunc a tellus aliquam condimentum sed sed purus. Mauris malesuada, nisl quis rutrum auctor, justo metus accumsan nunc, et porttitor erat justo at turpis. Vestibulum condimentum tellus sit amet ipsum luctus finibus. Suspendisse in ornare arcu. Cras lacinia venenatis leo ac dapibus. Praesent efficitur magna nibh, in convallis lectus sodales vel. Suspendisse pretium mi ut eros lobortis, in aliquam libero interdum. Morbi ut tellus est. Nulla interdum odio sit amet erat pretium, vel aliquet lacus efficitur. Mauris venenatis ultrices tincidunt. Morbi varius, quam lobortis ullamcorper malesuada, enim elit dignissim nibh, id malesuada erat nisl dapibus augue. Nulla posuere odio at ligula blandit mollis. Cras aliquam vel nisi at elementum.

Sed ligula dolor, viverra in scelerisque in, vulputate at nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices vulputate lorem quis rhoncus. Phasellus semper scelerisque tortor, vitae commodo sapien feugiat aliquet. Donec urna metus, faucibus vehicula mattis vestibulum, convallis eu justo. Pellentesque quis eleifend mi, id facilisis libero. Vestibulum aliquam leo porttitor dolor dapibus, sed convallis felis lacinia. Nullam fringilla massa tellus, quis sagittis turpis consequat sed. In sit amet diam commodo, lobortis risus ac, convallis ex. Nunc blandit elit quis justo tincidunt, sit amet aliquam libero ornare. Donec ultrices iaculis mauris.

Sed eget est nec nisl mattis volutpat. Aliquam erat volutpat. Maecenas diam tortor, convallis ut risus sit amet, dapibus viverra justo. Ut dapibus mollis risus, in tempor elit efficitur eget. In maximus congue lorem, lacinia gravida lorem fermentum id. Ut fermentum felis quis leo tincidunt vestibulum. Integer consequat eros non nisi consectetur gravida sit amet eu mauris. Aenean nec quam ut mi vehicula faucibus. Aenean magna purus, vestibulum in augue gravida, efficitur ultrices ex. Integer vitae pellentesque mauris, a tincidunt justo. Nullam aliquet nulla non tempor tempor. Donec pharetra, risus feugiat cursus cursus, ipsum leo scelerisque magna, quis finibus massa erat in ex. Mauris at neque lacinia, tempor sem a, feugiat sem. Quisque orci magna, condimentum a ex eget, imperdiet accumsan odio. Donec libero mauris, elementum laoreet luctus a, tincidunt a purus. Proin vel suscipit erat, a placerat ligula.

Vivamus sapien enim, maximus ut eleifend id, faucibus non felis. Vivamus tincidunt, mi ut pretium commodo, lorem lacus suscipit tellus, sit amet ultrices magna nisi sed tortor. Praesent vulputate imperdiet justo, eleifend convallis dui feugiat sed. Aenean cursus, nisi at pulvinar auctor, dolor lectus placerat enim, nec porttitor odio sapien nec neque. Nullam vel tortor a purus venenatis euismod ut sit amet nisl. Fusce mattis leo vitae lectus fermentum, a aliquet metus mollis. Mauris id dapibus magna, at aliquam lacus. Vestibulum interdum turpis nec justo consequat posuere. Morbi quis malesuada ante, eu pretium felis. Duis cursus ipsum quis urna tincidunt, ut blandit sem ornare. Fusce consequat ultricies mauris, eu tristique odio pretium ac. Quisque a quam aliquet, semper lectus quis, sagittis sapien. Nam posuere urna ac erat facilisis elementum. Suspendisse augue massa, accumsan eu pretium a, laoreet aliquet enim. Praesent eleifend dignissim interdum.

Fusce consequat, nunc ut consectetur hendrerit, arcu arcu porttitor tortor, ac varius ipsum purus at ex. Fusce nec nisi vel ex pulvinar pulvinar. Aliquam varius magna quis purus molestie pharetra. Etiam eros tellus, dapibus vitae elit vitae, tristique feugiat metus. Maecenas vehicula dui nunc, ut luctus sem efficitur eu. Aliquam a dui sodales odio sollicitudin ultrices eu vitae lorem. Vivamus nibh purus, sodales in finibus sed, maximus eu ipsum. Nullam luctus, purus a facilisis commodo, orci nunc convallis mi, vitae semper lectus nunc id nunc. Vestibulum quis justo varius, tempus nunc vel, auctor enim. Cras malesuada laoreet blandit. Cras metus erat, aliquet eu blandit a, malesuada quis orci. Mauris vel quam tempus, varius ligula in, tristique purus. Nunc ut nisi interdum, mattis quam at, iaculis turpis. Phasellus pulvinar metus iaculis, blandit elit et, dignissim ligula. Integer laoreet vehicula purus, ac porttitor justo malesuada ac.

Ut eget rutrum risus. Donec posuere elementum maximus. Nullam pulvinar erat et fermentum pharetra. Sed vel purus nec arcu blandit facilisis eget vitae lectus. Etiam ut lectus consequat, convallis leo eget, euismod mi. Nunc elit ante, lobortis sit amet viverra nec, fermentum at lorem. Etiam eleifend mauris eu ipsum porttitor scelerisque. In sit amet vulputate nunc, ut maximus arcu. Praesent ornare purus mattis sem iaculis consectetur. In fringilla dolor mi, quis feugiat sem dapibus vitae. Quisque luctus ullamcorper lectus, at egestas nisi porta vitae. Sed rhoncus viverra neque, et efficitur nibh sodales luctus. Vestibulum leo lacus, egestas sit amet pellentesque vel, posuere in odio. Donec diam urna, eleifend non venenatis ut, feugiat at ligula. Duis nec imperdiet tortor. Etiam auctor tempor dui vitae dictum.

Sed mattis molestie massa in vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis id iaculis diam. Suspendisse potenti. Duis risus mi, fermentum eu tellus a, convallis commodo massa. Etiam tempus non massa non efficitur. Vestibulum dapibus sapien eu porttitor mattis. Ut vestibulum augue massa, vitae congue neque gravida egestas. Ut pharetra pulvinar ligula non dictum.

Curabitur in arcu nec diam egestas viverra et non ante. Praesent quis sollicitudin arcu. Mauris lacus lacus, venenatis iaculis dignissim id, eleifend at nisl. Proin dictum nibh nibh, sed auctor eros suscipit in. Nunc sit amet est sed ipsum hendrerit condimentum. Quisque sed imperdiet libero, ut auctor ligula. Praesent ullamcorper euismod urna eget commodo. Pellentesque efficitur nisi in sollicitudin ullamcorper. Integer faucibus ligula id eros ornare, non rhoncus felis volutpat. Vestibulum lectus mi, facilisis a dictum non, hendrerit vitae urna. Sed quam nunc, bibendum at sollicitudin id, ultrices sit amet lacus.`
  }
}
