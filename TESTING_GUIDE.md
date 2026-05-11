# 🚀 Guide de Lancement et de Test (Gabon ID)

Maintenant que l'application est connectée de façon native à **Supabase** (Serverless), voici comment lancer l'application et la tester de bout en bout.

## 1. Démarrer l'application

L'ancien serveur Node.js ayant été supprimé, vous n'avez plus besoin que d'une seule commande pour tout démarrer.
Dans votre terminal, tapez :

```bash
npm run dev
```

Cliquez ensuite sur le lien généré (généralement `http://localhost:8081` ou `http://localhost:5173`) pour ouvrir l'application dans votre navigateur.

---

## 2. Parcours de Test N°1 : Inscription Citoyen

1. Allez sur la page d'**Authentification** (via le bouton de connexion).
2. Entrez un **Nom Complet**, un **Email** et un **Mot de passe**.
3. Cliquez sur "S'inscrire".
4. **Vérification côté Supabase :** 
   - Allez dans votre Dashboard Supabase > **Authentication** > **Users**. Vous devriez voir votre nouvel utilisateur.
   - Allez dans **Table Editor** > **profiles**. Vous devriez voir son nom.
   - Allez dans **Table Editor** > **user_roles**. Vous devriez voir que son rôle par défaut est `user`.

---

## 3. Parcours de Test N°2 : Devenir Administrateur (Test du Portail)

L'utilisateur que vous venez de créer n'a pas accès au portail administrateur. Voici comment le promouvoir :

1. Dans votre Dashboard Supabase, allez dans **Table Editor** > **user_roles**.
2. Trouvez la ligne de votre utilisateur.
3. Double-cliquez sur la cellule `role` (qui contient "user") et modifiez-la en écrivant **`ambassador`** ou **`admin`**. Appuyez sur Entrée pour sauvegarder.
4. **Côté Application :** Déconnectez-vous et reconnectez-vous avec ce même utilisateur.
5. Vous avez maintenant accès au **Portail Administratif** (L'Œil de l'Ambassade / Panel Administratif) !

---

## 4. Ce qu'il faut tester dans le Portail

Une fois dans le panel d'administration :
- **Onglet "Admins" :** Assurez-vous que la liste affiche bien les administrateurs inscrits (les données viennent désormais de la vue de jointure simulée dans `AdminPortal.tsx`).
- **Onglet "Centre SOS" :** Les cas de démonstration s'affichent avec leur statut. (Ils sont actuellement tirés du fichier MockData, vous pourrez les connecter à Supabase par la suite).
- Vérifiez la réactivité et les nouvelles animations ajoutées par le Lazy Loading.

---

## 🛑 En cas de problème

Si l'inscription échoue ou que vous restez bloqué sur un chargement infini :
- Vérifiez que votre fichier `.env` a bien les bonnes clés `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
- Assurez-vous que le script SQL a bien été exécuté sans erreur dans le *SQL Editor* de Supabase.
