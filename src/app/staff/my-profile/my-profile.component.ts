import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadModule, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BackendService } from 'src/app/services/backend.service';
import { UploadFile } from './upload';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  editForm!: FormGroup;
  passwordForm!: FormGroup;
  drawerForm!: FormGroup;
  oldPassword?: string;
  user!: any;
  today = new Date();
  visible = false;
  passwordModall!: NzModalRef;
  profilePictureDetails: NzUploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private backend: BackendService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('token');
    this.user = JSON.parse(this.user);
    this.buildForm();
    this.oldPassword = this.user.password
    console.log(this.user)
  }

  buildForm() {
    this.editForm = this.fb.group({
      firstname: [this.user.firstname, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      middlename: [this.user.middlename, [Validators.required]],
      dob: [this.user.dob, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      date_joined: [this.user.date_joined, [Validators.required]],
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    })
  }

  submitPasswordForm() {
    console.log(this.passwordForm.value);
    if (this.passwordForm.controls['initialPassword'].value == null) {
      this.message.error("Please Input A New Password")
    } else if (this.passwordForm.controls['password1'].value == null) {
      this.message.error("Your New Password Field Cannot be Blank")
    } else if (this.passwordForm.controls['password2'].value == null) {
      this.message.error("Your Confirm Password Field Cannot be Blank")
    } else {
      const password = this.passwordForm.controls['password2'].value;
      this.backend.updateStaffPassword(password, this.user.id).subscribe((response) => {
        if (response.success === true) {
          this.message.create(`success`, `${response.message}`);
          this.passwordModall.destroy()
        }
      })
    }
  }

  passwordModal(passwordTemplate: TemplateRef<{}>) {
    this.buildPasswordForm();
    this.passwordModall = this.modal.create({
      nzTitle: `Change Your Password`,
      nzContent: passwordTemplate,
      nzFooter: [
        {
          label: 'Cancel',
          type: "dashed",
          onClick: () => (
            this.passwordForm.reset(),
            this.passwordModall.destroy()
          )
        },
        {
          type: "primary",
          shape: "round",
          label: 'Change Password',
          onClick: () => (
            this.submitPasswordForm()
          )
        }
      ],
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  buildPasswordForm() {
    this.passwordForm = this.fb.group({
      initialPassword: [null, [this.oldPWvalidity]],
      password1: [null, [Validators.required]],
      password2: [null, [this.verifyNew]],
    })
  }

  verifyNew = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.passwordForm.controls['password1'].value) {
      return { error: true, wrong_combination: true };
    }
    return {};
  };

  oldPWvalidity = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.oldPassword) {
      return { mismatch: true, error: true };
    }
    return {};
  };

  open(): void {
    this.buildDrawerForm();
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  buildDrawerForm() {
    this.drawerForm = this.fb.group({
      firstname: [this.user.firstname, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      middlename: [this.user.middlename, [Validators.required]],
      dob: [this.user.dob, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      username: [this.user.username, [Validators.required]],
    })
  }

  submitEditForm() {
    console.log(this.drawerForm.value);
    this.backend.editStaffProfile(this.drawerForm.value, this.user.id).subscribe((response) => {
      if (response.success === true) {
        this.message.create(`success`, `${response.message}`);

      }
    })

  }
  beforeUpload = (file: UploadFile): boolean => {
    console.log(file)
    let a = file.originFileObj
    this.profilePictureDetails = this.profilePictureDetails.concat(file);

    console.log(a)

    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    //console.log(typeof(this.profilePictureDetails))
    let a = this.profilePictureDetails as any
    formData.append('files', JSON.stringify(a))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //this.profilePictureDetails.forEach((file: any) => {
    // formData.append('files', file);
    //});

    console.log(formData)
  }

  file = new FormControl('')
  file_data: any = ''
  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    const file = fileList[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    this.file_data = formData
    console.log(this.file_data, file)
  }
}