﻿// <auto-generated />
using System;
using Knjizara_BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Knjizara_BE.Migrations
{
    [DbContext(typeof(KnjizaraContext))]
    [Migration("20210907171514_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Knjizara_BE.Models.Knjiga", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Autor")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Autor");

                    b.Property<int>("BrStrana")
                        .HasColumnType("int")
                        .HasColumnName("BrStrana");

                    b.Property<int>("GodIzdavanja")
                        .HasColumnType("int")
                        .HasColumnName("GodIzdavanja");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int")
                        .HasColumnName("Kolicina");

                    b.Property<string>("Naziv")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Naziv ");

                    b.Property<int>("PozUredu")
                        .HasColumnType("int")
                        .HasColumnName("PozUredu");

                    b.Property<int?>("RafID")
                        .HasColumnType("int");

                    b.Property<int>("Red")
                        .HasColumnType("int")
                        .HasColumnName("Red");

                    b.HasKey("ID");

                    b.HasIndex("RafID");

                    b.ToTable("Knjiga");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Knjizara", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Adresa");

                    b.Property<string>("Naziv")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)")
                        .HasColumnName("Naziv");

                    b.HasKey("ID");

                    b.ToTable("Knjizara");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Raf", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrPolicaPoRedu")
                        .HasColumnType("int")
                        .HasColumnName("BrPolicaPoRedu");

                    b.Property<int>("BrojRedova")
                        .HasColumnType("int")
                        .HasColumnName("BrojRedova");

                    b.Property<int?>("KnjizaraID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Naziv");

                    b.HasKey("ID");

                    b.HasIndex("KnjizaraID");

                    b.ToTable("Raf");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Knjiga", b =>
                {
                    b.HasOne("Knjizara_BE.Models.Raf", "Raf")
                        .WithMany("Knjige")
                        .HasForeignKey("RafID");

                    b.Navigation("Raf");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Raf", b =>
                {
                    b.HasOne("Knjizara_BE.Models.Knjizara", "Knjizara")
                        .WithMany("Rafovi")
                        .HasForeignKey("KnjizaraID");

                    b.Navigation("Knjizara");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Knjizara", b =>
                {
                    b.Navigation("Rafovi");
                });

            modelBuilder.Entity("Knjizara_BE.Models.Raf", b =>
                {
                    b.Navigation("Knjige");
                });
#pragma warning restore 612, 618
        }
    }
}
