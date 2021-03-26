﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SWEBackend.Data;

namespace SWEBackend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210325204723_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("SWEBackend.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Capacity")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("VenueId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("VenueId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("SWEBackend.Models.SWEFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<byte[]>("ByteData")
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.ToTable("SWEFile");
                });

            modelBuilder.Entity("SWEBackend.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<int>("SpeakerId")
                        .HasColumnType("integer");

                    b.Property<int>("TimeSlotId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("SpeakerId");

                    b.HasIndex("TimeSlotId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int>("SpeakerPhotoId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SpeakerPhotoId");

                    b.ToTable("Speakers");
                });

            modelBuilder.Entity("SWEBackend.Models.TimeSlot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("SWEBackend.Models.Venue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Venues");
                });

            modelBuilder.Entity("SWEBackend.Models.Room", b =>
                {
                    b.HasOne("SWEBackend.Models.Venue", "Venue")
                        .WithMany("Rooms")
                        .HasForeignKey("VenueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Venue");
                });

            modelBuilder.Entity("SWEBackend.Models.Session", b =>
                {
                    b.HasOne("SWEBackend.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SWEBackend.Models.Speaker", "Speaker")
                        .WithMany("Sessions")
                        .HasForeignKey("SpeakerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SWEBackend.Models.TimeSlot", "TimeSlot")
                        .WithMany("Sessions")
                        .HasForeignKey("TimeSlotId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("Speaker");

                    b.Navigation("TimeSlot");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.HasOne("SWEBackend.Models.SWEFile", "SpeakerPhoto")
                        .WithMany("Speakers")
                        .HasForeignKey("SpeakerPhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SpeakerPhoto");
                });

            modelBuilder.Entity("SWEBackend.Models.SWEFile", b =>
                {
                    b.Navigation("Speakers");
                });

            modelBuilder.Entity("SWEBackend.Models.Speaker", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.TimeSlot", b =>
                {
                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("SWEBackend.Models.Venue", b =>
                {
                    b.Navigation("Rooms");
                });
#pragma warning restore 612, 618
        }
    }
}
