PGDMP     2                	    z            todolist    14.5    14.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    todolist    DATABASE     m   CREATE DATABASE todolist WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_American Samoa.1252';
    DROP DATABASE todolist;
                postgres    false            �            1259    16395    todos    TABLE     �   CREATE TABLE public.todos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(150) NOT NULL,
    "isDone" boolean DEFAULT false,
    "isDelete" boolean DEFAULT false
);
    DROP TABLE public.todos;
       public         heap    postgres    false            �          0    16395    todos 
   TABLE DATA           @   COPY public.todos (id, title, "isDone", "isDelete") FROM stdin;
    public          postgres    false    209   |       _           2606    16400    todos Todos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.todos
    ADD CONSTRAINT "Todos_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.todos DROP CONSTRAINT "Todos_pkey";
       public            postgres    false    209            �   \  x�m�1�T1���)����q�Kp�i�$�]�yZ	�� {�m��f(g.27!���������%���{Ju�F@�[(I�,�oO�qZ��N�/~�9�P���؁�v��ks��(N��n~�V�Y�AH%�դPDbe�0D��������u;n;L�!rgRgì,6�,S屮�����i
)ʘ�8��@�P��R.B���z}��?�0�26�$(@M��C�*�C�(vraF7���P�Cf> ���|K�>����gqg��7R�jbP�E �
�Loѭ$5��iV�d� YP��,�#�V0��n�_���r޶�u{��\��?�;�c��     